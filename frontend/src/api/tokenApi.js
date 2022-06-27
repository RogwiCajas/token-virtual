import axios from "axios";

export const tokenApi = axios.create({
    baseURL: 'http://localhost:8000/token'
});