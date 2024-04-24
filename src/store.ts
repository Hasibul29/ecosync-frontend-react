import { create } from "zustand";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {},
  setUser: (user) => set(() => ({ user: user })),
}));

export default useUserStore;
