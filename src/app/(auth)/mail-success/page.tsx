import Link from "next/link";
import IcMailSuccess from "@/assets/images/mail-success.svg";
import Image from "next/image";

export default function MailSuccessPage() {
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
            <div className="text-34-34 font-bold">Successfully Registered</div>
            <div className="text-black-6 text-16-24 font-visby">
              Thank you for registering! We have sent an activation link to the
              email address you provided. Please check your inbox and follow the
              instructions to activate your account.If you do not receive the
              email within a few minutes, please check your spam folder. If you
              encounter any issues, feel free to contact our support team for
              assistance.
            </div>
            <Link
              className="btn bg-primary text-white hover:bg-primary-hover"
              href="/login"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
