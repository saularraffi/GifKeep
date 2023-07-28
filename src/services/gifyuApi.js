import axios from 'axios';

const baseUrl = "http://localhost:8080/api/gifnotes"

export function getGifNotes() {
    return axios.get(baseUrl).then(res => res.data);
}