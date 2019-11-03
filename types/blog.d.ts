/**
 * Key - Value
 */
interface KeyValue<T> {
  [key: string]: T;
}

/**
 * ポスト
 */
export interface Post {
  title: string;
  description: string;
  body: string;
}

/**
 * リクエスト時のパラメータ
 */
export interface Param {
  slug: string;
  month: string;
}
