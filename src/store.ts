import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import secureLocalStorage from "react-secure-storage";
import { Roles } from "./hooks/useRbacRoles";
import superjson from "superjson";
import { STS } from "./hooks/useSTS";
import { Landfill } from "./hooks/useLandfill";

const SecureStorage: StateStorage = {
  getItem: (name: string) => {
    const str = secureLocalStorage.getItem(name) as string;
    if (!str) return null;
    return superjson.parse(str);
  },
  setItem: (name: string, value: string) => {
    secureLocalStorage.setItem(name, superjson.stringify(value));
  },
  removeItem: (name: string) => {
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


interface STSStore {
  sts: Partial<STS>;
  setSTS: (sts: STS) => void;
}


export const useSTSStore = create<STSStore>()(
  persist(
    (set) => ({
      sts: {},
      setSTS: (sts) => set(() => ({ sts: sts })),
    }),
    { name: "sts", storage: createJSONStorage(() => SecureStorage) }
  )
)


interface LandfillStore {
  landfill: Partial<Landfill>;
  setLandfill: (landfill: Landfill) => void;
}


export const useLandfillStore = create<LandfillStore>()(
  persist(
    (set) => ({
      landfill: {},
      setLandfill: (landfill) => set(() => ({ landfill: landfill })),
    }),
    { name: "landfill", storage: createJSONStorage(() => SecureStorage) }
  )
)