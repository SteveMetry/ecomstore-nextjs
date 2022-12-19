import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Layout } from ".components/Layout";
import { User } from ".entities/user.interface";
import { useUsersStore } from ".hooks/usersStore";

interface UserInput {
  username?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const usersList = useUsersStore((state) => state.usersList);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userInputs, setUserInputs] = useState<UserInput>({});
  const [isLoginValid, setIsLoginValid] = useState(true);
  const loginUser = useUsersStore((state) => state.loginUser);

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
          LOGIN
        </h1>
      }
      className="bg-slate-100 min-h-screen"
    >
      <form
        className="flex flex-col w-4/12 h-4/6 my-5 mx-auto rounded p-2 bg-white"
        onSubmit={handleSubmit}
      >
        <h4 className="font-thin">Sign in:</h4>
        <input
          className="
            bg-white
            border border-solid border-gray-300
            rounded
            focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="The Username.."
          name="username"
          value={userInputs.username || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          className="
          bg-white
          border border-solid border-gray-300
          rounded
          focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password Please.."
          name="password"
          value={userInputs.password || ""}
          onChange={handleChange}
        />
        {!isLoginValid && (
          <span className="text-red-400 text-xs">
            Invalid, Please Try Again
          </span>
        )}
        <small className="text-gray-600">
          We never share your information with anyone else.
        </small>
        <button type="submit">Login</button>
        <button
          className="
            px-6 py-2 leading-tight
            w-full
          "
        >
          Create Account
        </button>
      </form>
    </Layout>
  );
}
