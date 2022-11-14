import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";
import {
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

import SiteLogo from ".img/logo.png";

export const CustomNavbar = ({ children }: PropsWithChildren<object>) => (
  <nav className="flex items-center shadow-2xl p-4 bg-neutral-700">
    <Link href="/">
      <Image src={SiteLogo} alt="Site Logo" height={44} />
    </Link>
    <div className="flex flex-auto justify-center">{children}</div>
    <Link href="/contact" className="h-full text-white w-8 mx-6">
      <QuestionMarkCircleIcon />
    </Link>
    <Link href="/login" className="h-full text-white w-8">
      <ArrowRightOnRectangleIcon />
    </Link>
  </nav>
);
