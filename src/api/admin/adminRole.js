// api/screening.js
import axios from 'axios';
import Cookies from "js-cookie";
export const adminRole = async (role) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.post(`https://ecomarket-cuk.shop/admin/role/${role}`, 
    {
        body: {
            "role":role,
        }
    }, 
    {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
    });
    console.log('업로드 성공-AdminRole');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
