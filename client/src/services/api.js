import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	withCredentials: true,
	// baseURL: "https://healapi.onrender.com/api/v1/"
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
export const loginAuth = (payload) => api.post("./auth/login", payload);
export const signupAuth = (payload) => api.post("./auth/signup", payload);
export const logoutAuth = () => api.post("./auth/logout");

export const getUserData = () => api.get("/user");

export const getCompany = (id) => api.get(`/company/${id}`);
export const createCompany = (data) => api.post('/company', data);
export const updateCompany = (id, data) => api.patch(`/company/${id}`, data);
export const createProduct = (id, data) => api.post(`/company/${id}`, data);
export const updateProduct = (id, pid, data) => api.patch(`/company/${id}/${pid}`, data);