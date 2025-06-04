import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService } from '@/services/recharge.service';
import type { Operator, OperatorListResponse } from '@/services/recharge.service';

export const fetchOperators = createAsyncThunk(
  'operator/fetchOperators',
  async () => {

    const res: OperatorListResponse = await rechargeService.getOperators();
    return res;

  }
);

interface OperatorState {
  operators: Operator[];
  loading: boolean;
  error: string | null;
}

const initialState: OperatorState = {
  operators: [],
  loading: false,
  error: null,
};

const operatorSlice = createSlice({
  name: 'operator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperators.fulfilled, (state, action: any) => {
        state.loading = false;
        state.operators = action.payload;
        return state
      })
      .addCase(fetchOperators.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch operators';
      });
  },
});

export default operatorSlice.reducer; 