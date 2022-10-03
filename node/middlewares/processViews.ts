import {json} from 'co-body'
import {currentDate, subtractOneDay, subtractOneMonth, subtractOneWeek} from "../utils/functions";
import {SessionEntity, SessionSchema, ViewsEntity, ViewsSchema} from "../utils/constants";

export async function processViews(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req)
    const {
        clients: {productViews: productViewsClient}
    } = ctx

    let output = {
        views: 0
    }

    let startDate = currentDate()
    if (body.period === 'day') {
        // subtract one day from today
        startDate = subtractOneDay()
    } else if (body.period === 'week') {
        // subtract 7 days from today
        startDate = subtractOneWeek()
    } else {
        // DEFAULT: subtract one month from today
        startDate = subtractOneMonth()
    }

    const checkSession = await productViewsClient.getDocuments(ctx, SessionEntity, SessionSchema, `sessionId=${body.session} AND productId=${body.productId} AND date>${startDate}`)
    const todayViews = await productViewsClient.getDocuments(ctx, ViewsEntity, ViewsSchema, `productId=${body.productId} AND date=${currentDate()}`)

    if (!checkSession.length) {
        let viewsBody = {}
        if (!todayViews.length) {
            viewsBody = {
                productId: body.productId,
                date: currentDate(),
                views: 1
            }
        } else {
            const currentViews = todayViews[0]
            viewsBody = {
                ...currentViews,
                views: currentViews.views + 1
            }
        }

        await productViewsClient.saveDocuments(ctx, ViewsEntity, ViewsSchema, viewsBody);

        // create session also
        const sessionBody = {
            sessionId: body.session,
            productId: body.productId,
            date: currentDate()
        }
        await productViewsClient.saveDocuments(ctx, SessionEntity, SessionSchema, sessionBody)
    }

    // Get product views
    const productViewsWhere = `productId=${body.productId} AND (date between ${startDate} AND ${currentDate()})`;
    const productViews = await productViewsClient.getDocuments(ctx, ViewsEntity, ViewsSchema, productViewsWhere)
    if(productViews.length) {
        let totalViews = 0;
        productViews.map((item: any) => {
            totalViews += item.views
        })

        output = {
            ...output,
            views: totalViews
        }
    }

    ctx.status = 200
    ctx.body = output

    await next()
}
