"use client";
import Link from "next/link";
import ImgRole from "@/assets/images/ic_roles.png";
import ImgTenant from "@/assets/images/ic_tenant.png";
import ImgUser from "@/assets/images/ic_user.png";
import ImgModel from "@/assets/images/ic_ai.png";
import Image from "next/image";
export interface IDashboardProps {}

export function Dashboard(props: IDashboardProps) {
  const pageList = [
    { label: "Companies", link: "tenant-management", image: ImgTenant },
    { label: "Users", link: "account-management", image: ImgUser },
    { label: "Models", link: "model-management", image: ImgModel },
  ];
  const pageListOthers = [
    { label: "Roles", link: "roles-management", image: ImgRole },
  ];
  return (
    <div>
      <p className="text-34-34 font-extrabold font-visby pb-2 ">
        Welcome back, Admin
      </p>
      <hr />
      <div className="flex flex-col gap-4">
        <p className="mt-4 font-visby font-bold text-24-28">Recently used</p>
        <div className="flex gap-3">
          {pageList.length
            ? pageList.map((page: any, index: number) => {
                return (
                  <Link href={`/${page.link}`} key={index} className="flex">
                    <div className="border w-[275px] h-[200px] rounded-2xl shadow-lg">
                      <div className="bg-gray-300 h-[140px] rounded-tl-2xl rounded-tr-2xl flex justify-center items-center">
                        <Image
                          src={page.image}
                          alt="icon"
                          width={120}
                          height={120}
                        />
                      </div>
                      <div className="flex justify-center items-center h-[60px]">
                        <p className="font-visby text-24-28 font-bold">
                          {page.label}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="mt-8 font-visby font-bold text-24-28">Others</p>
        <div className="flex gap-3">
          {pageListOthers.length
            ? pageListOthers.map((page: any, index: number) => {
                return (
                  <Link href={`/${page.link}`} key={index} className="flex">
                    <div className="border w-[275px] h-[200px] rounded-2xl shadow-lg">
                      <div className="bg-gray-300 h-[140px] rounded-tl-2xl rounded-tr-2xl flex justify-center items-center">
                        <Image
                          src={page.image}
                          alt="icon"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="flex justify-center items-center h-[60px]">
                        <p className="font-visby text-24-28 font-bold">
                          {page.label}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
