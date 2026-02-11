import axios from 'axios';
export const baseUrl = "https://chatapp-latest-bkvj.onrender.com";
const httpClient = axios.create({
    baseURL: baseUrl,
});
export default httpClient;