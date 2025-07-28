declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Log page views
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Add just a few useful e-commerce events
export const trackPurchase = (orderId: string, value: number) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("event", "purchase", {
    transaction_id: orderId,
    value: value,
    currency: "USD",
  });
};

export const trackAddToCart = (itemName: string, value: number) => {
  if (!GA_TRACKING_ID) return;
  window.gtag("event", "add_to_cart", {
    currency: "USD",
    value: value,
    item_name: itemName,
  });
};
