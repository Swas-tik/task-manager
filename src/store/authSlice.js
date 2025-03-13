import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  users: JSON.parse(sessionStorage.getItem("users")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    userLogin: (state, action) => {
      const { email, password } = action.payload;
  
      const storedUsers = JSON.parse(sessionStorage.getItem("users")) || [];
      const existingUser = storedUsers.find((user) => {
        return user.email === email && user.password === password;
      });

      if (!existingUser) {
        alert("❌ Invalid username or password!");
      } else {
        sessionStorage.setItem("loggedInUser", JSON.stringify(existingUser)); // Store logged-in user
        state.user = existingUser;
      }
    },
    Logout: (state) => {
      sessionStorage.removeItem("loggedInUser");
      state.user = null;
    },
    userSignup: (state, action) => {
      const newUser = action.payload;
      const updatedUsers = [...state.users, newUser];
      sessionStorage.setItem("users", JSON.stringify(updatedUsers)); // Store all users
      state.users = updatedUsers;
    },
  },
});

export const { userLogin, Logout, userSignup } = authSlice.actions;
export default authSlice.reducer;
//Compare this snippet from src/components/auth/Login.jsx;
