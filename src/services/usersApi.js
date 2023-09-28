import axios from "axios";

const baseUrl = "http://localhost:8080/api/users";

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
