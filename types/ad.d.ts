/**
 * Style
 */
interface AdStyle {
  display: string;
}

/**
 * Ad
 */
export interface Ad {
  id: string;
  format: string;
  layout: string;
  style: AdStyle;
}
