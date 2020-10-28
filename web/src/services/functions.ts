// import { removeSpecialChars } from './mask';

export const groupItems = (arr: any, groupBy: string) => arr.reduce((result: any, item: any) => {
  // eslint-disable-next-line no-param-reassign
  (result[item[groupBy]] = result[item[groupBy]] || []).push(item);
  return result;
}, {});
