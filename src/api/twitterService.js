import axiosInstance from './axiosConfig';
const TWITTER_URL = '/twitter';

export const addUser = (payload) =>
    axiosInstance
        .post(`${TWITTER_URL}/addUser`, payload)
        .then((res) => res.data)
        .catch((e) => e.response.data);

export const checkUser = (payload) =>
    axiosInstance
        .get(`${TWITTER_URL}/checkUser/${payload.username}`)
        .then((res) => res.data)
        .catch((e) => e.response.data);

export const validateUser = (payload) =>
    axiosInstance
        .post(`${TWITTER_URL}/validateUser`, payload)
        .then((res) => res.data)
        .catch((e) => e.response.data);
