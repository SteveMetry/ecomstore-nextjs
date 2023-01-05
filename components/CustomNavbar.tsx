import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0/client";
import SiteLogo from ".img/logo.png";

export const CustomNavbar = ({ children }: PropsWithChildren<object>) => {
  const { user, error, isLoading } = useUser();
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const profileIcon = () => (
    <div
      className={`flex flex-col`}
      onMouseEnter={() => setDisplayUserInfo(true)}
    >
      {user ? (
        <>
          <Link
            href="/settings"
            className="relative "
            style={{
              aspectRatio: "2/2",
              height: "3rem",
              maxWidth: "3rem",
              margin: "auto"
            }}
          >
            <Image
              src={`${user.picture}`}
              alt={`${user.nickname} profile picture`}
              fill
              className="rounded-full"
            />
          </Link>
        </>
      ) : (
        <Link href="/api/auth/login" className="h-full text-white w-8">
          <ArrowRightOnRectangleIcon />
        </Link>
      )}
    </div>
  );
  return (
    <nav className="flex flex-col fixed w-full z-10">
      <div className="bg-black md:bg-black/[0.91] p-4">
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
          <div className="hidden sm:block">{profileIcon()}</div>
        </div>
        <div className="flex sm:hidden flex-auto justify-evenly mt-4">
          {children}
          {profileIcon()}
        </div>
      </div>
      {user && (
        <div className="hidden md:contents">
          <div
            className={`${
              displayUserInfo ? "block" : "hidden"
            } flex flex-col w-80 shadow-lg rounded-b-md self-end bg-white p-2`}
            onMouseLeave={() => setDisplayUserInfo(false)}
          >
            <h4 className="font-thin text-lg text-center">Welcome:</h4>
            <Link
              href="/settings"
              className="self-center text-sm w-full underline"
            >
              Settings
            </Link>
            <h5 className="font-normal mb-2">Name: {user.name}</h5>
            <h5 className="font-normal mb-2">Email: {user.email}</h5>
            <Link
              href="/api/auth/logout"
              className="h-full text-white w-1/4 self-center text-sm text-center bg-black rounded p-2"
            >
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
