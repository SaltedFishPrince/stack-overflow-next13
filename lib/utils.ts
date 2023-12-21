import { clsx, type ClassValue } from 'clsx';
import queryString from 'query-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`;

  return joinedDate;
};


interface UrlQueryParams {
  params: string;
  searchValue: {
    [k: string]: any
  };
}
export const formUrlQuery = ({ params, searchValue }: UrlQueryParams) => {
  const currentUrl = queryString.parse(params);
  Object.entries(searchValue).forEach(([key, value]) => {
    if (value === '') {
      delete currentUrl[key];
    } else {
      currentUrl[key] = value;
    }
  });
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}


export const debounce = <T extends (...args: any) => any>(func: T, wait: number, immediate: boolean = false) => {
  let timeout: NodeJS.Timeout | null = null;
  const later = (context: T, args: Parameters<T>) => {
    timeout = null;

    if (!immediate) {
      func.apply(context, args);
    }
  };
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    const callNow = immediate && !timeout;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      later(context, args)
    }, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
