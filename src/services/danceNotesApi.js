import axios from "axios";

const baseUrl = "http://localhost:8080/api/danceNotes";

export function getDanceNotes() {
    try {
        const response = axios.get(baseUrl);
        return response;
    } catch (error) {
        return error;
    }
}

export function getDanceNotesByCategory(category) {
    try {
        const response = axios.get(`${baseUrl}?category=${category}`);
        return response;
    } catch (error) {
        return error;
    }
}

export function postDanceNote(noteText, category, videoUrl) {
    try {
        const response = axios.post(baseUrl, {
            note: noteText,
            category: category,
            videoUrl: videoUrl,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export function deleteDanceNote(id) {
    try {
        const response = axios.delete(`${baseUrl}?id=${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export function putDanceNote(id, noteText, category, videoUrl) {
    try {
        const response = axios.put(baseUrl, {
            id: id,
            note: noteText,
            category: category,
            videoUrl: videoUrl,
        });
        return response;
    } catch (error) {
        return error;
    }
}
