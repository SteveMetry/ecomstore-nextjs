import { useUsersStore } from ".hooks/usersStore";
import Image from "next/image";
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

async function openUrl(url: string) {
  window.location.replace(`/${url}`);
}

export default function ConsolePage() {
  const usr = useUsersStore((state) => state.user);
  const allUsers = useUsersStore((state) => state.usersList);
  const isUserDataValid = useUsersStore((state) => state.isUserDataValid);
  const updateUser = useUsersStore((state) => state.updateUser);
  const logOutUser = useUsersStore((state) => state.logOutUser);
  const [user, setUser] = useState<User>();

  if (usr == undefined) {
    openUrl("login");
  }

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
    <Layout
      navbarChildren={
        <h1 className="font-thin">Signed in as:{user?.username}</h1>
      }
      className="bg-slate-100 min-h-screen flex"
    >
      {user && (
        <div className="profile-container flex flex-col mt-40 md:grid md:grid-cols-3 w-4/6 m-auto items-center justify-center">
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
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Password:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.password}
                  name="password"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Email:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.email}
                  name="email"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Phone:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.phone}
                  name="phone"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">First Name:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.firstname}
                  name="firstname"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Last Name:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.lastname}
                  name="lastname"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Age:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.age}
                  name="age"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <h3 className="font-thin text2xl md:text-sm">Gender:</h3>
                <input
                  onChange={handleChange}
                  defaultValue={user.gender}
                  name="gender"
                  className="
                    bg-white
                    border border-solid border-gray-300
                    rounded"
                />
                <button>Update Account</button>
                <button type="button" onClick={logOutUser}>
                  Log Out
                </button>
              </>
            }
          </form>
          <Image src={user.image} alt="user-img" width={50} height={50} />
        </div>
      )}
    </Layout>
  );
}
