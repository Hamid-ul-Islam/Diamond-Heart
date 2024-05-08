import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}

const initialState: AuthSlice = {
  isLoggedIn:
    localStorage.getItem("email") !== null &&
    localStorage.getItem("email") !== undefined &&
    localStorage.getItem("email") !== "",
  modalOpen: false,
  email: localStorage.getItem("email") ?? "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, modalOpen: action.payload };
    },
    doLogin: (state, action: PayloadAction<LoginProps>) => {
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        email: action.payload.email,
        modalOpen: false,
        isLoggedIn: true,
      };
    },
    doLogout: (state) => {
      localStorage.removeItem("email");
      return { ...state, email: "", isLoggedIn: false };
    },

    doRegister: (state, action: PayloadAction<RegisterProps>) => {
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        email: action.payload.email,
        modalOpen: false,
        isLoggedIn: true,
      };
    },
  },
});

export const { updateModal, doLogin, doLogout, doRegister } = authSlice.actions;
export default authSlice.reducer;
