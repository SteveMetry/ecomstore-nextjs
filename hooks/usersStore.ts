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
    phone: 211808620,
    email: "steven.metry22@ggmak.com",
    firstname: "john",
    lastname: "smith",
    age: 2,
    gender: "male",
    image: "https://robohash.org/admin3",
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
    image: "https://robohash.org/admin2",
    cartItems: []
  },
  {
    id: 3,
    mode: "admin",
    username: "e",
    password: "e",
    phone: 94721487,
    email: "Admin@tech.com",
    firstname: "eds",
    lastname: "yusif",
    age: 18,
    gender: "Man",
    image: "https://robohash.org/admin1",
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

export const useUsersStore = create<UserState>()(
  persist((set, get) => ({
    user: undefined,
    usersList: defaultUserList,
    addUser: (chosenUser) => {
      const isUserDataValid = isUserValid(chosenUser, get().usersList);
      if (isUserDataValid.every((curVal: boolean) => curVal === true)) {
        set((state) => ({ usersList: [...state.usersList, chosenUser] }));
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
    },
    userExist: (chosenUser) => {
      return !!get().usersList.find((item) => item.id === chosenUser.id);
    },
    loginUser: (chosenUser) => {
      set(() => ({
        user: chosenUser
      }));
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
