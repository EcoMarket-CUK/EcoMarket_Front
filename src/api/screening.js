// api/screening.js

import axios from 'axios';
import Cookies from "js-cookie";
export const screening = async (dto, productPhotos) => {
  try {
    const accessToken = Cookies.get("accessToken");
    console.log("moved dto :", dto);
    const formData = new FormData();
      
    // DTO 객체를 JSON 문자열로 변환하여 FormData에 추가
    formData.append("screeningDto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    // formData.append('screeningDto',dto);
    // 이미지 파일을 FormData에 추가
    productPhotos.forEach((photo) => {
      formData.append("images", photo);
    });

    const response = await axios.post('https://ecomarket-cuk.shop/screenings', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
    });
    console.log('업로드 성공-screening');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
