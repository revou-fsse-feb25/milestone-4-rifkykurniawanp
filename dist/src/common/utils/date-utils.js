"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWIBDateTime = formatWIBDateTime;
function formatWIBDateTime(value) {
    const date = new Date(value);
    if (isNaN(date.getTime()))
        return 'Invalid Date';
    const options = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const parts = formatter.formatToParts(date);
    const datePart = `${parts.find((p) => p.type === 'year')?.value}-${parts.find((p) => p.type === 'month')?.value}-${parts.find((p) => p.type === 'day')?.value}`;
    const timePart = `${parts.find((p) => p.type === 'hour')?.value}:${parts.find((p) => p.type === 'minute')?.value}:${parts.find((p) => p.type === 'second')?.value}`;
    return `${datePart} ${timePart} WIB`;
}
