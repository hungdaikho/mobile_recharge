import { IPaymentStripeRequest, rechargeService } from "@/services/recharge.service"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getApiKeyStripe = createAsyncThunk('stripe/getApiKeyStripe', async () => {
    const response = await rechargeService.getApiKeyStripe()
    return response
})
export const createPaymentStripe = createAsyncThunk('stripe/createPaymentStripe', async (data: IPaymentStripeRequest) => {
    const response = await rechargeService.createPaymentStripe(data)
    return response
})
const initialState = false
const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {}
})
export default stripeSlice.reducer