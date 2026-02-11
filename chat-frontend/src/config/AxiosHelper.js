import axios from 'axios';
export const baseUrl = "http://localhost:8080";
const httpClient = axios.create({
    baseURL: baseUrl,
});
export default httpClient;