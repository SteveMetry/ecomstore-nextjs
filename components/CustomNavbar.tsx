import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";
import {
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

import SiteLogo from ".img/logo.png";

export const CustomNavbar = ({ children }: PropsWithChildren<object>) => (
  <nav className="flex flex-col p-4 bg-neutral-700 fixed w-full z-10">
    <div className="flex items-center justify-between">
      <Link href="/">
        <Image src={SiteLogo} alt="Site Logo" height={44} />
      </Link>
      <div className="hidden sm:flex flex-auto justify-center mx-4">
        {children}
      </div>
      <div className="flex">
        <Link href="/contact" className="h-full text-white w-8 mr-6">
          <QuestionMarkCircleIcon />
        </Link>
        <Link href="/login" className="h-full text-white w-8">
          <ArrowRightOnRectangleIcon />
        </Link>
      </div>
    </div>
    <div className="flex sm:hidden flex-auto justify-center mt-4">
      {children}
    </div>
  </nav>
);
