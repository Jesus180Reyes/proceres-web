/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginAuthResponse } from '../../../../datasource/entities/responses/loginauth_response';
type AuthStatus = 'authenticated' | 'authenticating' | 'notAuthenticated' ;
// Define a type for the slice state
interface AuthState {
  authenticationStatus: AuthStatus;
  user: LoginAuthResponse | undefined;
}

// Define the initial state using that type
const initialState: AuthState = {
    authenticationStatus: 'notAuthenticated',
    user: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginAuthResponse>) => {
        state.authenticationStatus = 'authenticated';
      state.user = action.payload;
      localStorage.setItem('token', action.payload.token);
    },
    logOut: (state) => {
        state.authenticationStatus = 'notAuthenticated';
        state.user = undefined;
        localStorage.clear();

    },
  },
})

export const { login, logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer