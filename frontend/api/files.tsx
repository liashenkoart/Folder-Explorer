import axios from "axios";

export const FilesAPI = {
  getAll: () => axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files`),
  setFile: (data:any) => axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/files/file`, data),
}