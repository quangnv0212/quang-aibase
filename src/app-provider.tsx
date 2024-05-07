"use client";
import { createContext, useContext, useState } from "react";
import { clientSessionToken } from "./lib/http";
import { CurrentUser } from "./app/layout";
import { decodeJWT } from "./lib/utils";

const AppContext = createContext<{
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
}>({
  user: null,
  setUser: () => {},
});
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
export default function AppProvider({
  children,
  inititalSessionToken = "",
  user: userProp,
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
  user: CurrentUser | null;
}) {
  const [user, setUser] = useState<CurrentUser | null>(userProp);

  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
      if (!inititalSessionToken) {
        setUser(null);
      } else {
        setUser(decodeJWT(inititalSessionToken));
      }
    }
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
