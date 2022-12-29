import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import SiteLogo from ".img/logo.png";

export const CustomNavbar = ({ children }: PropsWithChildren<object>) => (
  <nav className="flex flex-col p-4 bg-black md:bg-black/[0.91] fixed w-full z-10">
    <div className="flex items-center justify-between">
      <Link href="/" className="w-full md:w-auto">
        <Image
          src={SiteLogo}
          alt="Site Logo"
          height={44}
          className="m-auto md:m-0"
        />
      </Link>
      <div className="hidden sm:flex flex-auto justify-center mx-4">
        {children}
      </div>
      <div className="flex">
        <Link href="/login" className="h-full text-white w-8 mr-6">
          <UserCircleIcon />
        </Link>
        <Link href="" className="h-full text-white w-8">
          <PowerIcon />
        </Link>
      </div>
    </div>
    <div className="flex sm:hidden flex-auto justify-center mt-4">
      {children}
    </div>
  </nav>
);
