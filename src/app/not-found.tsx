import IcNotFound from "@/assets/images/ic_notfound.svg";
import Image from "next/image";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Image
        src={IcNotFound.src}
        className="w-1/3"
        alt=""
        width={16}
        height={16}
      />
      <div className="text-center">
        <div className="text-34-34 font-bold my-3">
          Sorry, the page can’t be found
        </div>
        <div className="text-black-6 mt-5 mb-6 text-16-24 font-visby px-[120px]">
          The page you were looking for appears to have been moved, deleted or
          does not exist.
        </div>
        <Link
          className="btn bg-primary text-white hover:bg-primary-hover"
          href="/login"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
