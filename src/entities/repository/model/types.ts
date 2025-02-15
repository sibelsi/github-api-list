export interface ICredentials {
  owner: string;
  token: string;
}

export interface IRepository {
  id: number;
  name: string;
  description: string | null;
  private: boolean;
}

export interface ICreateRepoData {
  name: string;
  description: string;
  private: boolean;
}

export interface IUpdateRepoData {
  description: string;
  private: boolean;
}

export interface IGitHubError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IRepoContentItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  html_url: string;
  download_url?: string;
}