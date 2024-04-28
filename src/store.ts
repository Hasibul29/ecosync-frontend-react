import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import  secureLocalStorage  from  "react-secure-storage";
import { Roles } from "./hooks/useRbacRoles";

const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return secureLocalStorage.getItem(name) as string;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    secureLocalStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    secureLocalStorage.removeItem(name);
  },
};

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  roleId?: string;
  role?: Roles;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => SecureStorage),
    }
  )
);

export default useUserStore;

interface RoleStore {
  role: Roles;
  setRole: (role: Roles) => void;
}

export const useRoleStore = create<RoleStore>()(
  persist(
    (set) => ({
      role: {},
      setRole: (role) => set(() => ({ role: role })),
    }),
    { name: "role", storage: createJSONStorage(() => SecureStorage) }
  )
);
