import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { rechargeService } from '@/services/recharge.service';

interface InfoState {
  info: any;
  loading: boolean;
  error: string | null;
}

const initialState: InfoState = {
  info: null,
  loading: false,
  error: null,
};

export const fetchInfo = createAsyncThunk('info/fetchInfo', async (_, { rejectWithValue }) => {
  try {
    const res = await rechargeService.info();
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Unknown error');
  }
});

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default infoSlice.reducer;
