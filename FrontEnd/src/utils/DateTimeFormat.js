
export function DateTimeFormat(datetime, options = 1) {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return options === 1 ? `${day}/${month}/${year}` : '';
}