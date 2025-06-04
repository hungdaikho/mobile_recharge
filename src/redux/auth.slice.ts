import { LoginRequest, rechargeService } from '@/services/recharge.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  access_token: string
  auth: boolean
  user: {
    createdAt: string,
    id: string,
    role: string,
    username: string
  }
}
const initialState: AuthState = {
  access_token: "",
  user: {
    createdAt: "",
    id: "",
    role: "",
    username: ""
  },
  auth: false
};
export const login = createAsyncThunk('auth/login', async (data: LoginRequest) => {
  const res = await rechargeService.login(data)
  return res
})
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth:(state,_action)=>{
      state.auth = false 
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (_state, action: any) => {
      if (action.payload?.access_token) {
        localStorage.setItem('token', action.payload.access_token);
      }
      return { ...action.payload, auth: true }
    })
    builder.addCase(login.rejected, () => {
      localStorage.removeItem('token');
      return initialState;
    })
  }
});
export default authSlice.reducer; 
export const { setAuth } = authSlice.actions;