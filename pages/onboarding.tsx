import { Layout } from ".components/Layout";
import { User } from ".entities/user.interface";
import { useUsersStore } from ".hooks/usersStore";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
    <Layout navbarChildren={<h1 className="font-thin">Sign Up</h1>}>
      <form
        className="grid gap-5 grid-cols-1 m-auto w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <input
            name="username"
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
            className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
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
        <select
          name="gender"
          className="w-full max-w-lg rounded-lg border border-slate-200 px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
          defaultValue={userInputs.gender || ""}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className="text-center">
          <button
            type="submit"
            className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline w-36"
          >
            Save Info
          </button>
        </div>
      </form>
    </Layout>
  );
}
