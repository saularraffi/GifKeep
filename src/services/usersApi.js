import axios from "axios";

const baseUrl = "http://localhost:8080/api/users";

export function getUser() {
    const userId = localStorage.getItem("userId");

    try {
        const response = axios.get(`${baseUrl}?id=${userId}`);
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
