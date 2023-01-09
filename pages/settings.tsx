import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Layout } from ".components/Layout";

const inputStyling =
  "px-4 py-2 text-xl md:text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:border-blue-600 focus:outline-none self-center";

export default function ConsolePage() {
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <>
      <Head key="Manage Sendnet Account">
        <title>Account Settings - SENDNET SHOP</title>
        <meta
          name="description"
          content="manage account, edit personal information, update postal address, and purchase items all with your sendnet account"
        />
        <meta name="title" content="MY SENDNET SETTINGS - SENDNET SHOP" />
        <meta
          name="keywords"
          content="manage my sendnet User, view my sendnet account, buy sendnet products, shop sendnet products, view sendnet settings, manage settings, manage account"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
      </Head>
      <Layout
        navbarChildren={
          <h1
            className="font-thin
        max-sm:text-4xl
        md:text-3xl
        text-white"
          >
            Hi: {user?.nickname}
          </h1>
        }
        className="bg-slate-100 min-h-screen flex"
      >
        {user && (
          <div className="profile-container flex flex-col mt-40 md:mt-28 md:grid md:grid-cols-3 w-4/6 m-auto items-center justify-center">
            <div
              className="grid gap-2 md:col-span-2
            w-full
            text-base
            font-normal
            text-gray-700
            "
            >
              <h3 className="font-thin text2xl md:text-sm">Name:</h3>
              <input
                placeholder={user.name || ""}
                className={inputStyling}
                disabled
              />
              <h3 className="font-thin text2xl md:text-sm">Email:</h3>
              <input
                placeholder={user.email || ""}
                className={inputStyling}
                disabled
              />
              <h3 className="font-thin text2xl md:text-sm">Given Name:</h3>
              <input
                placeholder={`${user.given_name}`}
                className={inputStyling}
                disabled
              />
              <h3 className="font-thin text2xl md:text-sm">Family Name:</h3>
              <input
                placeholder={`${user.family_name}`}
                className={inputStyling}
                disabled
              />
              <div
                className="text-white
                      font-bold flex flex-col items-center"
              >
                <Link
                  href="/api/auth/logout"
                  className="
                      w-2/3
                      px-4
                      py-1.5
                      bg-blue-400
                      text-white
                      font-bold
                      rounded
                      hover:bg-blue-500
                      focus:bg-blue-500
                      active:bg-blue-600
                      ml-4
                      my-2
                      self-center
                      text-center
                  "
                >
                  Log Out
                </Link>
              </div>
            </div>
            <div
              className="relative mx-8 my-20"
              style={{ aspectRatio: "1", height: "3.5rem", margin: "auto" }}
            >
              <Image
                className="rounded-full object-contain "
                src={`${user.picture}`}
                alt={`${user.nickname} profile pic`}
                fill
              />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
