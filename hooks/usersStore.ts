import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from ".entities/user.interface";

interface UserState {
  user: User | undefined;
  usersList: User[];
  addUser: (chosenUser: User) => boolean;
  removeUser: (chosenUser: User) => void;
  updateUser: (chosenUser: User) => void;
  userExist: (chosenUser: User) => boolean;
  loginUser: (chosenUser: User, redirect?: string) => boolean;
  logOutUser: () => void;
  isUserDataValid: (chosenUser: User) => boolean[];
}

const defaultUserList: User[] = [
  {
    id: 1,
    mode: "Customer",
    username: "steve",
    password: "metrrry",
    phone: 3,
    email: "steven.metry22@ggmak.com",
    firstname: "john",
    lastname: "smith",
    age: 2,
    gender: "male",
    image: "/img/half_person_icon.png",
    cartItems: []
  },
  {
    id: 2,
    mode: "admin",
    username: "steveM",
    password: "admin",
    phone: 94721489,
    email: "steven.metry@gmail.com",
    firstname: "steven",
    lastname: "metry",
    age: 19,
    gender: "Man",
    image: "/img/half_person_icon.png",
    cartItems: []
  },
  {
    id: 3,
    mode: "admin",
    username: "e",
    password: "e",
    phone: 94721489,
    email: "Admin@tech.com",
    firstname: "e",
    lastname: "yusif",
    age: 18,
    gender: "Man",
    image: "/img/half_person_icon.png",
    cartItems: []
  }
];

function isEmailValid(usersList: User[], user: User) {
  return (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) &&
    !usersList.find(
      (curUser) => curUser.id != user.id && curUser.email === user.email.trim()
    )
  );
}

function isPhoneValid(usersList: User[], user: User) {
  return (
    !isNaN(user.phone) &&
    !usersList.find(
      (curUser) => curUser.id != user.id && curUser.phone === user.phone
    )
  );
}

function isUsernameValid(usersList: User[], user: User) {
  return (
    /^[a-zA-Z ]{3,28}$/.test(user.username) &&
    !usersList.find(
      (curUser) => curUser.id != user.id && curUser.username === user.username
    )
  );
}
const isUserValid = (chosenUser: User, usersList: User[]) => {
  const testUserData = [
    isUsernameValid(usersList, chosenUser),
    /^[a-zA-Z0-9 ]{3,28}$/.test(chosenUser.password),
    isPhoneValid(usersList, chosenUser),
    isEmailValid(usersList, chosenUser),
    /^[a-zA-Z ]{2,28}$/.test(chosenUser.firstname),
    /^[a-zA-Z ]{2,28}$/.test(chosenUser.lastname),
    !isNaN(chosenUser.age)
  ];
  return testUserData;
};

const updateUserList = (usersList: User[], usr: User) => {
  usersList.map((item, index) => {
    if (item.id === usr.id) {
      usersList[index] = usr;
    }
  });
  return usersList;
};

const defaultUser = {
  id: 10,
  mode: "customer",
  username: "",
  password: "",
  phone: 0,
  email: "",
  firstname: "",
  lastname: "",
  age: 0,
  gender: "Man",
  image: "/img/half_person_icon.png",
  cartItems: []
};

export const useUsersStore = create<UserState>()(
  persist((set, get) => ({
    user: undefined,
    usersList: defaultUserList,
    addUser: (chosenUser) => {
      const isUserDataValid = isUserValid(chosenUser, get().usersList);
      if (isUserDataValid.every((curVal: boolean) => curVal === true)) {
        set((state) => ({ usersList: [...state.usersList, chosenUser] }));
        console.log("added User", get().usersList);
        return true;
      }
      return false;
    },
    removeUser: (chosenUser) => {
      set((state) => ({
        usersList: state.usersList.filter((item) => item.id !== chosenUser.id)
      }));
    },
    updateUser: (chosenUser) => {
      const updatedUser = { ...get().user, ...chosenUser };
      set((state) => ({
        user: updatedUser,
        usersList: updateUserList(state.usersList, updatedUser)
      }));
      console.log(get().usersList);
    },
    userExist: (chosenUser) => {
      return !!get().usersList.find((item) => item.id === chosenUser.id);
    },
    loginUser: (chosenUser, redirect) => {
      set(() => ({
        user: chosenUser
      }));
      console.log(get().user);
      // window.location.replace(`${redirect ? `/${redirect}` : "/settings"}`);
      return true;
    },
    isUserDataValid: (chosenUser) => {
      return isUserValid(chosenUser, get().usersList);
    },
    logOutUser: () => {
      set(() => ({
        user: undefined
      }));
      window.location.reload();
    }
  }))
);
