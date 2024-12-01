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
  
  /**
   * 카테고리를 한글로 변환하거나, 변환되지 않으면 원래 값을 반환합니다.
   * @param {string} category - 영어 카테고리 이름
   * @returns {string} - 한글 카테고리 이름
   */
  export const getCategoryDisplayName = (category) => {
    return reverseCategoryMapping[category] || category;
  };
  