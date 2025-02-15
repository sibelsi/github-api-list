import axios from "axios";

export const publicAxiosInstance = axios.create({baseURL: "https://api.github.com"})
export const privateAxiosInstance = axios.create({baseURL: "https://api.github.com"})

privateAxiosInstance.interceptors.request.use(
    (config) => {
      const credentials = localStorage.getItem("credentials")

      if(!credentials) {throw new Error("No credentials")}
      if (credentials) {
        const {token, owner} = JSON.parse(credentials);
        config.headers.Authorization = `token ${token}`;
        config.headers.Accept= 'application/vnd.github.v3+json';

        if(config.url?.includes("owner")){
          config.url = config.url.replace("owner", owner)
        }
      }
        return config;
    })