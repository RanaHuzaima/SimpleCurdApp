import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export const getItems = () => api.get('/items/');
export const getItem = (id: number) => api.get(`/items/${id}`);
export const createItem = (item: { id: number; name: string; description?: string }) => api.post('/items/', item);
export const updateItem = (id: number, item: { id: number; name: string; description?: string }) => api.put(`/items/${id}`, item);
export const deleteItem = (id: number) => api.delete(`/items/${id}`);
