import React from 'react';
import Slider from 'react-slick';

const ImageSlider = ({ imageUrls, productName }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => (
      <div className="slick-dot-custom"></div>
    ),
    dotsClass: "slick-dots slick-thumb",
  };

  return (
    <div className="detail-product-image">
      <Slider {...settings}>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`${productName} 이미지 ${index + 1}`} className="product-image-slide" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
