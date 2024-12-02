const reverseCategoryMapping = {
  PAINTING: "그림",
  RECORD: "음반",
  INSTRUMENT: "악기",
  SHOES: "신발",
  CLOTHING: "의류",
  ELECTRONICS: "전자",
  JEWELRY: "주얼리",
  BAGS: "가방",
  SEASONAL_ITEMS: "계절템",
  LIMITED_EDITION: "한정판",
};

const shippingStatusMapping = {
  PAYMENT_CONFIRMED: "결제 완료",
  SHIPPING_PREPARING: "배송 준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송 완료",
};

/**
 * Converts the English category to Korean or returns the original value.
 * @param {string} category - English category name
 * @returns {string} - Korean category name
 */
export const getCategoryDisplayName = (category) => {
  return reverseCategoryMapping[category] || category;
};

/**
 * Converts the English shipping status to Korean or returns the original value.
 * @param {string} status - English shipping status
 * @returns {string} - Korean shipping status
 */
export const getStatusDisplayName = (status) => {
  return shippingStatusMapping[status] || status;
};
