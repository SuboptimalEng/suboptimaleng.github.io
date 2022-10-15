export const GA_TRACKING_ID = 'G-S4BK468S48';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// TODO: Remove this?
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const event = ({
//   action,
//   category,
//   label,
//   value,
// }: {
//   action: string;
//   category: string | undefined;
//   label: string | undefined;
//   value: number | undefined;
// }) => {
//   window.gtag('event', action, {
//     event_category: category,
//     event_label: label,
//     value: value,
//   });
// };
