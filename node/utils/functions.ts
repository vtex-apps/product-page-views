export function formatDate(d: any) {
    return `${d.getFullYear()}-${
        (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}`
    }-${d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}`}`;
}

export function currentDate() {
    const d = new Date();
    return formatDate(d)
}

export function subtractOneDay() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const finalDate = new Date(year, month, day - 1);
    return formatDate(finalDate)
}

export function subtractOneWeek() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const finalDate = new Date(year, month, day - 7);
    return formatDate(finalDate)
}

export function subtractOneMonth() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const finalDate = new Date(year, month - 1, day);
    return formatDate(finalDate)
}
