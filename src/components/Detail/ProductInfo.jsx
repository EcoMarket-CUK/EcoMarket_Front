import React from 'react';

const ProductInfo = ({ productName, productDescription }) => {
  return (
    <div className="detail-product-info">
      <h1 className="detail-product-title">{productName}</h1>
      <p className="detail-product-description">{productDescription}</p>
    </div>
  );
};

export default ProductInfo;
