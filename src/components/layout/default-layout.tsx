"use client";
import AppProvider from "@/app-provider";
import { CurrentUser } from "@/app/layout";
import Logo from "@/assets/images/Logo.png";
import { decodeJWT } from "@/lib/utils";

import authApiRequest from "@/apiRequests/auth";
import {
  BankOutlined,
  DashboardOutlined,
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
  accessToken: any;
}
const { Content, Sider } = Layout;

export function DefaultLayout(props: IDefaultLayoutProps) {
  const { children, accessToken } = props;
  const queryClient = new QueryClient();
  const pathName = usePathname();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const logout = async () => {
    await authApiRequest.logoutFromNextClientToNextServer();
    router.push("/");
    router.refresh();
  };
  useEffect(() => {
    if (!accessToken?.value) {
      setUser(null);
    } else {
      setUser(decodeJWT(accessToken.value));
    }
  }, [accessToken]);
  const items: any[] = [
    {
      key: "/tenant-management",
      icon: <BankOutlined width={20} height={20} />,
      label: "Companies",
      onClick: () => {
        router.push("/tenant-management");
      },
    },
    {
      key: "/account-management",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => {
        router.push("/account-management");
      },
    },
    {
      key: "/model-management",
      icon: <ThunderboltOutlined />,
      label: "Models",
      onClick: () => {
        router.push("/model-management");
      },
    },
  ];
  let itemsFiltered = user?.permissions
    ?.map((x) => {
      switch (x) {
        case "Pages.Tenants":
          return items[0];
        case "Pages.Users":
          return items[1];
        case "Pages.Roles":
          return items[2];
        default:
          return null;
      }
    })
    .filter((x) => (x = true));
  itemsFiltered = [
    {
      key: "/",
      icon: <DashboardOutlined width={20} height={20} />,
      label: "Dashboard",
      onClick: () => {
        router.push("/");
      },
    },
    ...(itemsFiltered || []),
    {
      // key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          // key: "/logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            logout();
          },
        },
        {
          key: "/change-password",
          label: "Change Password",
          icon: <EditOutlined />,
          onClick: () => {
            router.push("/change-password");
          },
        },
      ],
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <AppProvider user={user} inititalSessionToken={accessToken?.value}>
          <ToastContainer />
          {!accessToken ? (
            <>{children}</>
          ) : (
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                width={240}
                theme="light"
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className=" flex items-center justify-center flex-col">
                  <div className="w-3 h-3"></div>
                  <Image src={Logo} alt="" width={300} height={300} />
                  <div className="w-2 h-2"></div>
                </div>
                <Menu
                  theme="light"
                  selectedKeys={[pathName]}
                  mode="inline"
                  items={itemsFiltered}
                />
              </Sider>
              <Layout>
                <Content style={{ margin: "24px" }}>{children}</Content>
              </Layout>
            </Layout>
          )}
        </AppProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
