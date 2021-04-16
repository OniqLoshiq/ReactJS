const parseDate = (input) => {
    let timestamp = Date.parse(input);
    let date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()} | ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}


export default parseDate;