import axios from "axios";

const axiosApiInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-Type": 'application/json;charset=utf-8',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
});

export default axiosApiInstance;