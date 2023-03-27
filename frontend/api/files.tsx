import axios from "axios";

export const FilesAPI = {
  getAll: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files`),
  createNewFile: (data:any) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/file`, data),
  createNewDirectory: (data:any) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/directory`, data),
  getByPath: (query:any) => axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/node/?path=${query}`),
}