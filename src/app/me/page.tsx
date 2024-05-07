import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Hồ sơ người dùng",
};
export default function Me() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  return (
    <div>
      <h1>Me</h1>
    </div>
  );
}
