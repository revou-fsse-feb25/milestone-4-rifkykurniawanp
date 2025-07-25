import { Decimal } from '@prisma/client/runtime/library';

/**
 * Safely converts various value types to number.
 * Handles Prisma Decimal, regular numbers, strings, and null/undefined values.
 */
export function safeDecimalToNumber(value: any): number {
  // Handle null, undefined, and empty cases first
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  // If it's already a number, return it directly
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      console.warn('[DecimalTransform] Invalid number value:', value);
      return 0;
    }
    return value;
  }

  // Check if it's a Prisma Decimal object
  if (
    typeof value === 'object' &&
    value !== null &&
    'toNumber' in value &&
    typeof value.toNumber === 'function'
  ) {
    try {
      const result = value.toNumber();
      if (isNaN(result) || !isFinite(result)) {
        console.warn('[DecimalTransform] Decimal.toNumber() returned invalid value:', result);
        return 0;
      }
      return result;
    } catch (e) {
      console.warn('[DecimalTransform] Failed to convert Decimal object:', value, e);
      return 0;
    }
  }

  // Handle string values
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

  // Handle bigint (just in case)
  if (typeof value === 'bigint') {
    try {
      return Number(value);
    } catch (e) {
      console.warn('[DecimalTransform] Failed to convert bigint:', value, e);
      return 0;
    }
  }

  // If we need to create a Decimal from an unknown type (last resort)
  try {
    const decimal = new Decimal(value);
    const result = decimal.toNumber();
    if (isNaN(result) || !isFinite(result)) {
      console.warn('[DecimalTransform] New Decimal() returned invalid value:', result);
      return 0;
    }
    return result;
  } catch (err) {
    console.warn('[DecimalTransform] Failed to create Decimal from value:', value, typeof value, err);
    return 0;
  }
}