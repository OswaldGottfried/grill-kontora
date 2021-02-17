import {CartItemType} from 'models/Cart';

export const GA_TRACKING_ID = process.env.GA_TRACKING_ID || 'G-X3KHDV92CT';

type EventNames =
  | 'add_payment_info'
  | 'add_to_cart'
  | 'add_to_wishlist'
  | 'begin_checkout'
  | 'checkout_progress'
  | 'exception'
  | 'generate_lead'
  | 'login'
  | 'page_view'
  | 'purchase'
  | 'refund'
  | 'remove_from_cart'
  | 'screen_view'
  | 'search'
  | 'select_content'
  | 'set_checkout_option'
  | 'share'
  | 'sign_up'
  | 'timing_complete'
  | 'view_item'
  | 'view_item_list'
  | 'view_promotion'
  | 'view_search_results';

type EventType = {
  action: EventNames;
  category?: string;
  label?: string;
  value?: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}: EventType): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
