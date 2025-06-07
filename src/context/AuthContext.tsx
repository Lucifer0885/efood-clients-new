import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import type {
  LoginCredentials,
  LoginResponse,
  User,
  RegisterCredentials,
  RegisterResponse,
  UpdateResponse,
} from "../types/user";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { socket } from "../api/sockets";

const AuthContext = createContext<{
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string;
  login: ({ email, password }: LoginCredentials) => void;
  register: ({ name, email, password }: RegisterCredentials) => void;
  logout: () => void;
  update: (name: string, phone?: string) => void;
  changePassword: (currentPassword: string, password: string) => void;
}>({
  user: null,
  token: null,
  loading: false,
  error: "",
  login: () => {},
  register: () => {},
  logout: () => {},
  update: () => {},
  changePassword: () => {},
});

export const AuthProvider = ({ children }) => {
  const localStorageUser = localStorage.getItem("user");
  const parsedUser = localStorageUser
    ? (JSON.parse(localStorageUser) as User)
    : null;
  const [user, setUser] = useState<User | null>(parsedUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axiosInstance.get<User>("/client/users/me").then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      });
    }
  }, []);

  const login = ({ email, password }: LoginCredentials) => {
    setLoading(true);
    axiosInstance
      .post<LoginResponse>("/client/auth/login", { email, password })
      .then((res) => {
        if (!res.data.success) {
          return;
        }

        const data = res.data.data;
        afterAuthentication(data);
        setError("");
      })
      .catch((e) => {
        setError(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = ({ name, email, password }: RegisterCredentials) => {
    setLoading(true);
    axiosInstance
      .post<RegisterResponse>("/client/auth/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        if (!res.data.success) {
          return;
        }

        const data = res.data.data;
        afterAuthentication(data);
        setError("");
      })
      .catch((e) => {
        setError(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const afterAuthentication = (
    data: RegisterResponse["data"] | LoginResponse["data"]
  ) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/");
  };

  const update = (name: string, phone?: string) => {
    setLoading(true);
    axiosInstance
      .post<UpdateResponse>("/client/auth/update", { name, phone })
      .then((response) => {
        if (!response.data.success) {
          return;
        }

        const data = response.data.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        setError("");
      })
      .catch((e) => {
        setError(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changePassword = (currentPassword: string, password: string) => {
    setLoading(true);
    axiosInstance
      .post<UpdateResponse>("/client/auth/change-password", {
        current_password: currentPassword,
        password,
      })
      .then((response) => {
        if (!response.data.success) {
          return;
        }
        setError("");
        navigate("/profile");
      })
      .catch((e) => {
        setError(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("address");
    navigate("/");
  };

  useEffect(() => {
    socket.emit("user-id", { user_id: user?.id });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        update,
        changePassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
