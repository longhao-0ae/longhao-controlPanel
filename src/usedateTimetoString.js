export const dateTimetoString = (Rawdate) => {
    var date;
    if(typeof Rawdate === 'string'){
        date = new Date(Rawdate);
    } else {
        date = Rawdate;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const dateString = year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second;
    return dateString;
}