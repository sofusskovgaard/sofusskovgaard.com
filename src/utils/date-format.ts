import { format } from 'date-fns'

export function formatDate(date: Date): String;

export function formatDate(date: String): String;

export function formatDate(date: any): String {
  if (date instanceof Date) {
    return format(date, "LLL dd, yyyy")
  } else {
    try {
      const _date = new Date(date)
      return format(_date, "LLL dd, yyyy")
    } catch(err) {
      console.log('Something went bad with the date formatting.', err)
    }
  }
}

export function formatDateWithoutDay(date: Date): String;

export function formatDateWithoutDay(date: String): String;

export function formatDateWithoutDay(date: any): String {
  if (date instanceof Date) {
    return format(date, "LLL, yyyy")
  } else {
    try {
      const _date = new Date(date)
      return format(_date, "LLL, yyyy")
    } catch(err) {
      console.log('Something went bad with the date formatting.', err)
    }
  }
}

export function formatLongDate(date: Date): String;

export function formatLongDate(date: String): String;

export function formatLongDate(date: any): String {
  if (date instanceof Date) {
    return format(date, "LLLL do, yyyy")
  } else {
    try {
      const _date = new Date(date)
      return format(_date, "LLLL do, yyyy")
    } catch(err) {
      console.log('Something went bad with the date formatting.', err)
    }
  }
}
