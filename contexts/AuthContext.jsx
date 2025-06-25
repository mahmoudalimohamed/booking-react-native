import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginApi, LogoutApi, RefreshAccessTokenApi } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access");
        const storedUser = await AsyncStorage.getItem("user");

        if (accessToken && storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await LoginApi(email, password);
      const { access, refresh, user: userData } = response.data;

      await AsyncStorage.setItem("access", access);
      await AsyncStorage.setItem("refresh", refresh);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ email, ...userData })
      );

      setUser({ email, ...userData });

      setIsAuthenticated(true);

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed",
        errors: error.response?.data || {},
      };
    }
  };

  const logout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refresh");
      const accessToken = await AsyncStorage.getItem("access");

      if (refreshToken && accessToken) {
        await LogoutApi(refreshToken, accessToken);
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    } finally {
      await AsyncStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      router.replace("/");
    }
  };

  const refreshToken = async () => {
    try {
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) throw new Error("No Refresh Tolken");

      const response = await RefreshAccessTokenApi(refresh);
      await AsyncStorage.setItem("access", response.data.access);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Token Refresh Failed:", error);
      await logout();
      return false;
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            const newAccessToken = await AsyncStorage.getItem("access");
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(error.config);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
