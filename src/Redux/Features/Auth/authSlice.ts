import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
  role?: string;
  bio?: string;
  subjects?: string;
  gradeLevel?: string;
  availability?: { from: string; to: string };
  price?: number;
  isProfileComplete: boolean;
};


type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    
updateUser(state, action) {
  if (state.user && action.payload) {
    const {
      name,
      phone,
      address,
      image,
      bio,
      subjects,
      gradeLevel,
      availability,
      price,
      isProfileComplete
    } = action.payload;

    state.user = {
      ...state.user,
      ...(name && { name }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(image && { image }),
      ...(bio && { bio }),
      ...(subjects && { subjects }),
      ...(gradeLevel && { gradeLevel }),
      ...(availability && { availability }),
      ...(price !== undefined && { price }),
      ...(typeof isProfileComplete === "boolean" && { isProfileComplete }),
    };
  }
}
,



    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout ,updateUser} = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
