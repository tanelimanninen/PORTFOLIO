import axios from "axios";

import { DiaryEntry, NewDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data)
};

export const createDiary = (object: NewDiary) => {
    return axios
        .post<DiaryEntry>(baseUrl, object)
        .then(response => response.data)
};