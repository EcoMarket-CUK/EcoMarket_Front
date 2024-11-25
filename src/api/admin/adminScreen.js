// api/screening.js
import axios from 'axios';
import Cookies from "js-cookie";
export const adminScreen = async (screeningId,newScreeningStatus) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.post(`https://ecomarket-cuk.shop/${screeningId}/screening-status`, 
    {
        body: {
            "screeningId": screeningId,
            "newStatus" : newScreeningStatus,
        }
    }, 
    {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
    });
    console.log('업로드 성공-AdminScreening');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
