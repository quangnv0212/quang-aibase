import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

export const getTenant = () => {
  let tenant;
  if (typeof window !== "undefined") {
    tenant = window.location.href;
    let newFullPath = tenant.substring(7);
    let parts = newFullPath.split(".");
    if (parts[0].includes("localhost")) {
      tenant = undefined;
    } else {
      tenant = parts[0];
    }
  }
  return tenant;
};
