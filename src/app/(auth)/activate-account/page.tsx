"use client";
import authApiRequest from "@/apiRequests/auth";
import IcMailSuccess from "@/assets/images/mail-success.svg";
import { ButtonCommon } from "@/components/common/button-common";
import { getTenant } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function ActivatePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const [loading, setLoading] = useState(false);
  const handleActivateAccount = async () => {
    try {
      setLoading(true);
      const res = await authApiRequest.activateByEmail({ email, token });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-[200px]">
      <div className="">
        <div className="flex justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white ">
          <Image
            src={IcMailSuccess.src}
            className="w-1/2"
            alt=""
            width={160}
            height={160}
          />
          <div className="flex flex-col gap-4">
            <div className="text-34-34 font-bold">Activate Account</div>
            <div className="text-black-6 text-16-24 font-visby"></div>
            <ButtonCommon
              loading={loading}
              onClick={handleActivateAccount}
              className="btn bg-primary text-white hover:bg-primary-hover"
            >
              Activate account
            </ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  );
}
