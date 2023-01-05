import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, ChangeEvent, useEffect, useState } from "react";

import { Layout } from ".components/Layout";
import { useUsersStore } from ".hooks/usersStore";
import { User } from ".entities/user.interface";

interface UserInput {
  username?: string;
  password?: string;
  email?: string;
  phone?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  gender?: string;
}
const inputStyling =
  "px-4 py-2 text-xl md:text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:border-blue-600 focus:outline-none self-center";

export default function ConsolePage() {
  const isUserDataValid = useUsersStore((state) => state.isUserDataValid);
  const logOutUser = useUsersStore((state) => state.logOutUser);
  const router = useRouter();
  const updateUser = useUsersStore((state) => state.updateUser);
  const usr = useUsersStore((state) => state.user);
  const [user, setUser] = useState<User>();

  const [userInputs, setUserInputs] = useState<UserInput>({
    username: usr?.username,
    password: usr?.password,
    email: usr?.email,
    phone: usr?.phone,
    firstname: usr?.firstname,
    lastname: usr?.lastname,
    age: usr?.age,
    gender: usr?.gender
  });

  useEffect(() => {
    if (usr == undefined) {
      router.replace("/login");
    } else {
      setUser(usr);
    }
  }, [usr, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      if (
        isUserDataValid({ ...user, ...userInputs }).every(
          (curVal: boolean) => curVal === true
        )
      ) {
        updateUser({ ...user, ...userInputs });
      } else return console.error("could not update user", userInputs);
    }
  };

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
            Signed in as: {user?.firstname} {user?.lastname}
          </h1>
        }
        className="bg-slate-100 min-h-screen flex"
      >
        {user && (
          <div className="profile-container flex flex-col mt-40 md:mt-28 md:grid md:grid-cols-3 w-4/6 m-auto items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="usr-info-inputs grid gap-2 md:col-span-2
            w-full
            text-base
            font-normal
            text-gray-700
            "
            >
              {
                <>
                  <h3 className="font-thin text2xl md:text-sm">Username:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.username}
                    name="username"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Password:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.password}
                    name="password"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Email:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.email}
                    name="email"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Phone:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.phone}
                    name="phone"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">First Name:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.firstname}
                    name="firstname"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Last Name:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.lastname}
                    name="lastname"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Age:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.age}
                    name="age"
                    className={inputStyling}
                  />
                  <h3 className="font-thin text2xl md:text-sm">Gender:</h3>
                  <input
                    onChange={handleChange}
                    defaultValue={user.gender}
                    name="gender"
                    className={inputStyling}
                  />
                  <div
                    className="text-white
                      font-bold flex flex-col items-center"
                  >
                    <button
                      type="submit"
                      className="
                      w-2/3
                      px-4
                      py-1.5
                      bg-blue-400
                      rounded
                      hover:bg-blue-500
                      focus:bg-blue-500
                      active:bg-blue-600
                      ml-4
                      my-2
                      self-center
                  "
                    >
                      Update Account
                    </button>
                    <button
                      type="button"
                      onClick={logOutUser}
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
                  "
                    >
                      Log Out
                    </button>
                  </div>
                </>
              }
            </form>
            <div
              className="relative mx-8 my-20"
              style={{ aspectRatio: "3/2", height: "20vh", margin: "auto" }}
            >
              <Image
                className="rounded-sm object-contain "
                src={user.image}
                alt={`${user.username} profile pic`}
                fill
              />
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
