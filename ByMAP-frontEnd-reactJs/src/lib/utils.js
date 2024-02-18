import {clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price, options) {
  options = options || {};
  const currency = options.currency || 'USD';
  const notation = options.notation || 'compact';

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}