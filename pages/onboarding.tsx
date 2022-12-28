import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Layout } from ".components/Layout";
import { User } from ".entities/user.interface";
import { useUsersStore } from ".hooks/usersStore";
import Head from "next/head";

interface UserInput {
  id?: number;
  mode?: string;
  username?: string;
  password?: string;
  email?: string;
  phone?: number;
  firstname?: string;
  lastname?: string;
  age?: number;
  gender?: any;
  image?: string;
  cartItems?: [];
}
const inputSyling =
  "w-11/12 px-4 py-2 text-xl md:text-sm font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:border-blue-600 focus:outline-none self-center";

export default function SignUpPage() {
  const usr = useUsersStore((state) => state.user);
  const loginUser = useUsersStore((state) => state.loginUser);
  const [user, setUser] = useState<User>();
  const usersList = useUsersStore((state) => state.usersList);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    setAllUsers(usersList);
  }, [usersList]);

  const [userInputs, setUserInputs] = useState<UserInput>({});

  const addUser = useUsersStore((state) => state.addUser);
  useEffect(() => {
    setUser(usr);
  }, [usr]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = { ...userInputs };
    const newUser = {
      id: allUsers[allUsers.length - 1].id + 1,
      mode: "customer",
      image: "/img/half_person_icon.png",
      cartItems: []
    };
    Object.assign(newUser, updatedUser);
    addUser(newUser as User) != false
      ? loginUser(newUser as User)
      : console.error("could not add user");
  };
  return (
    <>
      <Head key="Create account - Sendnet">
        <title>Create Account Now - SENDNET SHOP</title>
        <meta
          name="description"
          content="Create your SENDNET ACCOUNT NOW, Manage purchases, create reviews, view personal information and more, Create for free Today"
        ></meta>
        <meta
          name="title"
          content="Create SENDNET Account - SENDNET SHOP"
        ></meta>
        <meta
          name="keywords"
          content="create my sendnet User, create my sendnet account, Free SENDNET Account, Create your account today, Create sendnet, Sendnet, shop sendnet, sendnet store"
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
            Sign Up
          </h1>
        }
      >
        <form
          className="grid gap-5 grid-cols-1 m-auto w-96 mt-24 md:mt-12"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <input
              name="username"
              className={inputSyling}
              onChange={handleChange}
              placeholder="Username"
              value={userInputs.username || ""}
            />
            <p id="usernameError" className="text-red-600 hidden">
              Invalid username!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="password"
              className={inputSyling}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              value={userInputs.password || ""}
            />
            <p id="passwordError" className="text-red-600 hidden">
              Password too weak!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="email"
              className={inputSyling}
              onChange={handleChange}
              placeholder="Email"
              value={userInputs.email || ""}
            />
            <p id="emailError" className="text-red-600 hidden">
              Invalid email!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="phone"
              className={inputSyling}
              onChange={handleChange}
              placeholder="phone"
              type="number"
              value={userInputs.phone || ""}
            />
            <p id="phoneError" className="text-red-600 hidden">
              Please enter a number!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="firstname"
              className={inputSyling}
              onChange={handleChange}
              placeholder="First name"
              value={userInputs.firstname || ""}
            />
            <p id="firstnameError" className="text-red-600 hidden">
              Invalid first name!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="lastname"
              className={inputSyling}
              onChange={handleChange}
              placeholder="Last name"
              value={userInputs.lastname || ""}
            />
            <p id="lastnameError" className="text-red-600 hidden">
              Invalid last name!
            </p>
          </div>
          <div className="flex flex-col">
            <input
              name="age"
              className={inputSyling}
              onChange={handleChange}
              placeholder="Age"
              type="number"
              min="18"
              max="100"
              value={userInputs.age || ""}
            />
            <p id="ageError" className="text-red-600 hidden">
              Invalid age!
            </p>
          </div>
          <div className="flex flex-col">
            <select
              name="gender"
              className={inputSyling}
              defaultValue={userInputs.gender || ""}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4
            py-1.5
            bg-blue-400
            text-white
            font-bold
            rounded
            hover:bg-blue-500
            focus:bg-blue-500
            active:bg-blue-600
            ml-4
            my-2 w-36"
            >
              Create
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}
