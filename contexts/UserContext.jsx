import { createContext, useState } from "react";
import { ID } from "react-native-appwrite";
import { account } from "../lib/appwrite";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      throw Error(error.message);
    }
  }
  async function register(email, password, name) {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
    } catch (error) {
      throw Error(error.message);
    }
  }
  async function logout() {}
  const value = {
    user,
    login,
    register,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
