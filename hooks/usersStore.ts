import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from ".entities/user.interface";

interface UserState {
  user: User;
  usersList: User[];
  addUser: (chosenUser: User) => boolean;
  removeUser: (chosenUser: User) => void;
  updateUser: (chosenUser: User) => void;
  userExist: (chosenUser: User) => boolean;
  loginUser: (chosenUser: User) => void;
  isUserDataValid: (chosenUser: User) => boolean;
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

const isUserValid = (chosenUser: User) => {
  const testUserData = [
    /^[a-zA-Z ]{3,}$/.test(chosenUser.username),
    /^[a-zA-Z0-9 ]{3,}$/.test(chosenUser.password),
    !isNaN(chosenUser.phone),
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(chosenUser.email),
    /^[a-zA-Z ]{2,}$/.test(chosenUser.firstname),
    /^[a-zA-Z ]{2,}$/.test(chosenUser.lastname),
    !isNaN(chosenUser.age),
    chosenUser.gender !== ""
  ];
  return testUserData.every((curVal: boolean) => curVal === true);
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
    user: {
      id: defaultUserList[defaultUserList.length - 1].id + 1,
      mode: "customer",
      username: "",
      password: "",
      phone: 0,
      email: "",
      firstname: "",
      lastname: "",
      age: 0,
      gender: "",
      image: "/img/half_person_icon.png",
      cartItems: []
    } as User,
    usersList: defaultUserList,
    addUser: (chosenUser) => {
      const isUserDataValid = isUserValid(chosenUser);
      if (isUserDataValid) {
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
      return isUserValid(chosenUser);
    }
  }))
);
