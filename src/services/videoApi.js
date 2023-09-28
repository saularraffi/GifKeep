import axios from "axios";
import config from "../config";

const baseUrl = `${config.SERVER_URL}/api/videos`;

export function postVideo(noteId, videoFile) {
    try {
        const formData = new FormData();

        formData.append("danceNoteVideo", videoFile, videoFile.name);
        formData.append("noteId", noteId);

        const response = axios.post(baseUrl, formData);
        return response;
    } catch (error) {
        return error;
    }
}

export function deleteVideo(id) {
    try {
        const response = axios.delete(`${baseUrl}?id=${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
