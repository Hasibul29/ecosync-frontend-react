import { create } from "zustand";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roleId?: string;
  role?: Role;
}

interface Role {
  id?: string;
  name?: string;
  description?: string | null;
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


interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: {},
  setRole: (role) => set(() => ({ role: role })),
}))