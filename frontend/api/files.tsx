import axios from "axios";

export const FilesAPI = {
  getAll: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files`),
  createNewFile: (data: {}) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/file`, data),
  createNewDirectory: (data: {}) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/directory`, data),
  getByPath: (query: string) => axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/node/?path=${query}`),
  delete: (type: string, query: string) => axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/${type}?path=${query}`),
}