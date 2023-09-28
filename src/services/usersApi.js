import axios from "axios";
import config from "../config";

const baseUrl = `${config.SERVER_URL}/api/users`;

export function getUser(id) {
    try {
        const response = axios.get(`${baseUrl}?id=${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export function putUser(id, username, categories) {
    try {
        const response = axios.put(baseUrl, {
            id: id,
            username: username,
            categories: categories,
        });
        return response;
    } catch (error) {
        return error;
    }
}
