import axios from 'axios';
// import { Repository, CreateRepoData } from '';
import {axiosInstance} from "./axiosInstance.ts";
import {ICreateRepoData, IRepository, IUpdateRepoData} from "@/entities";
// import {CreateRepoData, Repository} from "src/entities";

export const githubApi = {
  checkCredential: async ({token}:{ token: string }) => {
    try {
      // Проверка валидности токена
      const res =await axiosInstance(
         '/user',

        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch {
      throw new Error('Invalid credentials');
    }
  },
  getRepos: async (credentials: { owner: string; token: string }) => {
    const response = await axiosInstance(
      `/users/${credentials.owner}/repos`,
      {
        headers: {
          Authorization: `Bearer ${credentials.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    return response.data as IRepository[];
  },
  createRepo: async (token: string, data: ICreateRepoData): Promise<IRepository> => {
    const response = await axiosInstance<ICreateRepoData>(
      '/user/repos',{
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
        data: {
          name: data.name,
          description: data.description,
          private: data.private,
          auto_init: true
        }
      });
    return response.data as IRepository;
  },

  updateRepo: async (
    owner: string,
    repoName: string,
    data: IUpdateRepoData,
    token: string
  ): Promise<IRepository> => {
    const response = await axios.patch(
      `https://api.github.com/repos/${owner}/${repoName}`,
      {
        description: data.description,
        private: data.private,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    return response.data;
  },

  deleteRepo: async (owner: string, repoName: string, token: string): Promise<void> => {
    await axios.delete(
      `https://api.github.com/repos/${owner}/${repoName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
  },
};