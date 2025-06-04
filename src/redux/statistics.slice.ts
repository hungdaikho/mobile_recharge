import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rechargeService } from '@/services/recharge.service';
import type { StatisticsParams, StatisticsSummaryResponse, OperatorStatisticsResponse } from '@/services/recharge.service';

interface StatisticsState {
  summary: StatisticsSummaryResponse | null;
  operatorStats: OperatorStatisticsResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  summary: null,
  operatorStats: [],
  loading: false,
  error: null,
};

export const fetchStatisticsSummary = createAsyncThunk(
  'statistics/fetchSummary',
  async (params: StatisticsParams) => {
    const response = await rechargeService.getStatisticsSummary(params);
    return response;
  }
);

export const fetchOperatorStatistics = createAsyncThunk(
  'statistics/fetchOperatorStats',
  async (params: StatisticsParams) => {
    const response = await rechargeService.getOperatorStatistics(params);
    return response;
  }
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.summary = null;
      state.operatorStats = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Summary
      .addCase(fetchStatisticsSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatisticsSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchStatisticsSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch statistics summary';
      })
      // Operator Stats
      .addCase(fetchOperatorStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOperatorStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.operatorStats = action.payload;
      })
      .addCase(fetchOperatorStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch operator statistics';
      });
  },
});

export const { clearStatistics } = statisticsSlice.actions;
export default statisticsSlice.reducer; 