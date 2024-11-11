import { format } from "date-fns";

export function formatDate(date?: Date | null): string;

export function formatDate(date?: string | null): string;

export function formatDate(date?: Date | null | string | null): string | undefined {
  if (date instanceof Date) {
    return format(date, "LLL dd, yyyy");
  } else if (typeof date === "string") {
    try {
      const _date = new Date(date);
      return format(_date, "LLL dd, yyyy");
    } catch (err) {
      console.log("Something went bad with the date formatting.", err);
    }
  }
  return undefined;
}

export function formatDateWithoutDay(date?: Date | null): string;

export function formatDateWithoutDay(date?: string | null): string;

export function formatDateWithoutDay(date?: any): string | undefined {
  if (date instanceof Date) {
    return format(date, "LLL, yyyy");
  } else if (typeof date === "string") {
    try {
      const _date = new Date(date);
      return format(_date, "LLL, yyyy");
    } catch (err) {
      console.log("Something went bad with the date formatting.", err);
    }
  }
  return undefined;
}

export function formatLongDate(date?: Date | null): string;

export function formatLongDate(date?: string | null): string;

export function formatLongDate(date?: any): string | undefined {
  if (date instanceof Date) {
    return format(date, "LLLL do, yyyy");
  } else if (typeof date === "string") {
    try {
      const _date = new Date(date);
      return format(_date, "LLLL do, yyyy");
    } catch (err) {
      console.log("Something went bad with the date formatting.", err);
    }
  }
  return undefined;
}
