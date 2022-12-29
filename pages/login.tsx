import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Layout } from ".components/Layout";
import { User } from ".entities/user.interface";
import { useUsersStore } from ".hooks/usersStore";
import Link from "next/link";
import Head from "next/head";

interface UserInput {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const usersList = useUsersStore((state) => state.usersList);
  const user = useUsersStore((state) => state.user);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userInputs, setUserInputs] = useState<UserInput>({});
  const [isLoginValid, setIsLoginValid] = useState(true);
  const loginUser = useUsersStore((state) => state.loginUser);
  if (user) {
    if (!!allUsers.find((item) => item.id === user.id)) {
      router.push("/settings");
    }
  }
  useEffect(() => {
    setAllUsers(usersList);
  }, [usersList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typedUser = allUsers.find(
      (user) => user.username === userInputs.username
    );
    if (typedUser == null) {
      setIsLoginValid(false);
    } else {
      const isValidPassword = typedUser.password === userInputs.password;
      setIsLoginValid(isValidPassword);
      if (isValidPassword) {
        loginUser(typedUser);
        router.push("/settings");
      }
    }
  };

  return (
    <>
      <Head key="Login to Sendnet's Shop">
        <title>Login Here - SENDNET SHOP</title>
        <meta
          name="description"
          content="Sign into your account Here, to view recent purchases and your personal information, please login to view your settings"
        ></meta>
        <meta
          name="title"
          content="Login to SENDNET SHOP - SIGN IN TO SENDNET"
        ></meta>
        <meta
          name="keywords"
          content="login my sendnet account, my sendnet account, sendnet login, login sendnet, Login Shop here, Login Sendnet Online, sign in to your account here, Sign In SendNet Here"
        ></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta
          http-equiv="Content-Type"
          content="text/html; charset=utf-8"
        ></meta>
        <meta name="language" content="English"></meta>
        <meta name="revisit-after" content="1 days"></meta>
      </Head>
      <Layout
        navbarChildren={
          <h1
            className="
          font-thin
          max-sm:text-4xl
          md:text-3xl
          text-white
        "
          >
            LOGIN TO SENDNET
          </h1>
        }
        className="bg-slate-100 min-h-screen"
      >
        <form
          className="flex flex-col md:w-4/12 md:h-4/6 m-auto mt-28 w-11/12 md:my-5 md:mx-auto rounded p-2 bg-white pb-6"
          onSubmit={handleSubmit}
        >
          <h4 className="font-thin text-xl md:text-normal m-2">
            Sign Into Your Account:
          </h4>
          <input
            className="
          w-11/12 px-4 py-2 text-xl md:text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:border-blue-600 focus:outline-none self-center mb-6"
            placeholder="The Username.."
            name="username"
            value={userInputs.username || ""}
            onChange={handleChange}
          />
          <input
            type="password"
            className="
          w-11/12 px-4 py-2 text-xl md:text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:border-blue-600 focus:outline-none self-center"
            placeholder="Password Please.."
            name="password"
            value={userInputs.password || ""}
            onChange={handleChange}
          />
          {!isLoginValid && (
            <span className="text-red-400 text-xs self-center">
              Invalid, Please Try Again
            </span>
          )}
          <small className="text-gray-600 self-center my-2">
            We never share your information with anyone else.
          </small>
          <button
            type="submit"
            className="
            w-11/12
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
          "
          >
            Login
          </button>
          <Link
            href="/onboarding"
            className="
          w-11/12
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
          text-center
          "
          >
            Create New Account
          </Link>
        </form>
      </Layout>
    </>
  );
}
