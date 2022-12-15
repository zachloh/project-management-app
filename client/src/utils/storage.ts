const storagePrefix = 'project_hub_';

const storage = {
  getToken: () => {
    const token = window.localStorage.getItem(`${storagePrefix}token`);
    if (token) {
      return JSON.parse(token) as string;
    }
    return null;
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
