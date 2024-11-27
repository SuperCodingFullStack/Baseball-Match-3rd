import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // 백엔드  요청보낼 때의 API URL
  timeout: 10000, // 타임아웃 10초
});
// 요청을 보낼 때 10초 이상걸리면 오류를 발생시킴

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("Authorization"); // 쿠키에서 JWT 토큰 가져오기
    if (token) {
      config.headers["Authorization"] = token; // 요청 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 에러가 발생하면 Promise.reject로 에러 반환
  }
);

export default apiClient; // 다른 곳에서 사용할 수 있도록 내보내기
