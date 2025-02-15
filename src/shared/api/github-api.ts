import {privateAxiosInstance, publicAxiosInstance} from "./privateAxiosInstance.ts";
import {ICreateRepoData, IRepoContentItem, IRepository, IUpdateRepoData} from "@/entities";

export const githubApi = {
  checkCredential: async ({token}:{ token: string }) => {
    try {
      const res =await publicAxiosInstance(
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
  getRepos: async () => {
    const response = await privateAxiosInstance(`/users/owner/repos`);
    return response.data as IRepository[];
  },

  createRepo: async (data: ICreateRepoData): Promise<IRepository> => {
    const response = await privateAxiosInstance<ICreateRepoData>(
      '/user/repos',{
        method: 'POST',
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
    repoName: string,
    data: IUpdateRepoData,
  ): Promise<IRepository> => {
    const response = await  privateAxiosInstance(
      `https://api.github.com/repos/owner/${repoName}`, {
        method: 'PATCH',
        data: {
          description: data.description,
          private: data.private,
        }}
    );
    return response.data;
  },

  deleteRepo: async (repoName: string): Promise<void> => {
    await privateAxiosInstance(
      `https://api.github.com/repos/owner/${repoName}`, {
        method: 'DELETE',
      }
    );
  },

  getRepoContent: async (
    repo: string,
    path: string,
  ): Promise<IRepoContentItem[]> => {
    const response = await privateAxiosInstance(
      `https://api.github.com/repos/owner/${repo}/contents/${path}`,
      {
      }
    );
    return response.data;
  },
};