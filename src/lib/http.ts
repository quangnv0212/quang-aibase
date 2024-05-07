import axios, { AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

class SessionToken {
  private token = "";
  private _expiresAt = new Date().toISOString();

  get value() {
    return this.token;
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this._expiresAt = expiresAt;
  }
}

export const clientSessionToken = new SessionToken();

export class Http {
  instance: AxiosInstance;
  clientSessionToken: SessionToken;
  constructor() {
    this.clientSessionToken = new SessionToken();
    this.instance = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_ENDPOINT ||
        "https://aibase.nobisoft.vn/api/v1.0",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (clientSessionToken.value) {
          config.headers.authorization = `Bearer ${clientSessionToken.value}`;
          config;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === "/services/app/Account/Register") {
          toast.success("Register success");
          window.location.href = "/mail-success";
        }
        return response;
      },
      (error) => {
        toast.error(error?.response?.data?.error?.message || "Error");
      }
    );
  }
}
const http = new Http().instance;
export default http;
