"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeDecimalToNumber = safeDecimalToNumber;
const library_1 = require("@prisma/client/runtime/library");
function safeDecimalToNumber(value) {
    if (value === null || value === undefined || value === '') {
        return 0;
    }
    if (typeof value === 'number') {
        if (isNaN(value) || !isFinite(value)) {
            console.warn('[DecimalTransform] Invalid number value:', value);
            return 0;
        }
        return value;
    }
    if (typeof value === 'object' &&
        value !== null &&
        'toNumber' in value &&
        typeof value.toNumber === 'function') {
        try {
            const result = value.toNumber();
            if (isNaN(result) || !isFinite(result)) {
                console.warn('[DecimalTransform] Decimal.toNumber() returned invalid value:', result);
                return 0;
            }
            return result;
        }
        catch (e) {
            console.warn('[DecimalTransform] Failed to convert Decimal object:', value, e);
            return 0;
        }
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (trimmed === '') {
            return 0;
        }
        const parsed = parseFloat(trimmed);
        if (isNaN(parsed) || !isFinite(parsed)) {
            console.warn('[DecimalTransform] Invalid string value:', value);
            return 0;
        }
        return parsed;
    }
    if (typeof value === 'bigint') {
        try {
            return Number(value);
        }
        catch (e) {
            console.warn('[DecimalTransform] Failed to convert bigint:', value, e);
            return 0;
        }
    }
    try {
        const decimal = new library_1.Decimal(value);
        const result = decimal.toNumber();
        if (isNaN(result) || !isFinite(result)) {
            console.warn('[DecimalTransform] New Decimal() returned invalid value:', result);
            return 0;
        }
        return result;
    }
    catch (err) {
        console.warn('[DecimalTransform] Failed to create Decimal from value:', value, typeof value, err);
        return 0;
    }
}
