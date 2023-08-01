import axios from 'axios';

const baseUrl = "http://localhost:8080/api/gifnotes"

export function getGifNotes() {
    try {
        const response = axios.get(baseUrl);
        return response;
    } catch (error) {
        return error;
    }
}

export function postGifNote(description, category, gifUrl) {
    try {
        const response = axios.post(baseUrl, {
            note: description,
            category: category,
            gifUrl: gifUrl
        });
        return response;
    } catch (error) {
        return error; 
    }
}

export function deleteGifNote(id) {
    try {
        const response = axios.delete(`${baseUrl}?id=${id}`)
        return response;
    } catch (error) {
        return error;
    }
}