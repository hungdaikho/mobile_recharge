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
export const getAllOperators = createAsyncThunk(
  'operator/getAllOperators',
  async () => {
    const res: OperatorListResponse = await rechargeService.getOperatorsAdmin();
    return res;
  }
);
export const getOperatorsByCountry = createAsyncThunk(
  'operator/getOperatorsByCountry',
  async (countryCode: string) => {
    const res: OperatorListResponse = await rechargeService.getOperatorsByCountry(countryCode);
    return res;
  }
);
export const updateOperator = createAsyncThunk(
  'operator/updateOperator',
  async ({id,active,color,description}: {id: string, active: boolean, color: string, description: string}) => {
    const res: Operator = await rechargeService.updateOperator(id, active, color, description);
    return res;
  }
);
export interface OperatorState {
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