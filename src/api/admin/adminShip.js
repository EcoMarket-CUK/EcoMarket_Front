// api/screening.js
import axios from 'axios';
import Cookies from "js-cookie";
export const adminShip = async (auctionId,newStatus,shippingCompany,trackingNumber) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.put(`https://ecomarket-cuk.shop/admin/${auctionId}/shipping-status`, 
    {
        body: {
            "auctionId": auctionId,
            "newStatus" : newStatus,
            "shippingCompany" : shippingCompany,
            "trackingNumber" : trackingNumber,
        }
    }, 
    {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
    });
    console.log('업로드 성공-AdminShipping');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
