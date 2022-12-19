import { useUsersStore } from ".hooks/usersStore";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import { User } from ".entities/user.interface";
import { Layout } from ".components/Layout";

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

export default function ConsolePage() {
  const router = useRouter();
  const usr = useUsersStore((state) => state.user);
  const isUserDataValid = useUsersStore((state) => state.isUserDataValid);
  const updateUser = useUsersStore((state) => state.updateUser);
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
    setUser(usr);
  }, [usr]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedUser = { ...usr, ...userInputs };
    if (isUserDataValid(updatedUser)) {
      updateUser(updatedUser);
    }
  };

  return (
    <Layout
      navbarChildren={
        <h1 className="font-thin">Signed in as:{user?.username}</h1>
      }
      className="bg-slate-100 min-h-screen"
    >
      {user && (
        <div className="profile-container flex flex-col md:grid md:grid-cols-3 w-4/6 m-auto">
          <form
            onSubmit={handleSubmit}
            className="usr-info-inputs grid gap-2 md:col-span-2"
          >
            {
              <>
                <input
                  onChange={handleChange}
                  defaultValue={user.username}
                  name="username"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.password}
                  name="password"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.email}
                  name="email"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.phone}
                  name="phone"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.firstname}
                  name="firstname"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.lastname}
                  name="lastname"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.age}
                  name="age"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <input
                  onChange={handleChange}
                  defaultValue={user.gender}
                  name="gender"
                  className="
                    w-full
                    text-base
                    font-normal
                    text-gray-700
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <button type="submit">Update Account</button>
              </>
            }
          </form>
          <Image src={user.image} alt="user-img" width={50} height={50} />
        </div>
      )}
    </Layout>
  );
}
