// @ts-ignore
import {ExternalClient, InstanceOptions, IOContext} from '@vtex/api'


export default class ProductViews extends ExternalClient {

    constructor(context: IOContext, options?: InstanceOptions) {
        super('', context, options)
    }

    public async getSession(ctx: any) {
        return this.http.get(`http://${ctx.vtex.account}.vtexcommercestable.com.br/api/sessions?items=*`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Vtex-Use-Https': true,
                'VtexIdclientAutCookie': ctx.vtex.authToken
            }
        })
    }

    public async getDocuments(ctx: any, entity: string, schema: string, where: string): Promise<any> {
        return await ctx.clients.masterdata.searchDocuments({
            dataEntity: entity,
            fields: [],
            pagination: {
                page: 1,
                pageSize: 5000,
            },
            schema,
            where
        })
    }

    public async saveDocuments(ctx: any, entity: string, schema: string, body: any): Promise<any> {
        return await ctx.clients.masterdata.createOrUpdateEntireDocument({
            dataEntity: entity,
            fields: body,
            schema,
            id: body.hasOwnProperty('id') ? body.id : ""
        })
    }


}
