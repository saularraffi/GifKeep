import axios from "axios";

const baseUrl = "http://localhost:8080/api/videos";

export function postVideo(videoFile) {
    try {
        const formData = new FormData();

        formData.append("danceNoteVideo", videoFile, videoFile.name);

        const response = axios.post(baseUrl, formData);
        return response;
    } catch (error) {
        return error;
    }
}
