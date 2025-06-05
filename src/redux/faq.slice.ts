import { rechargeService } from "@/services/recharge.service"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface IFaq {
    question: string,
    solve: string
    id: string
}
const initialState: IFaq[] = []

export const getFaqContent = createAsyncThunk('faq/getFaqContent', async () => {
    const response = await rechargeService.getFaqContent()
    return response
})
const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getFaqContent.fulfilled, (state, action: any) => {
            state = action.payload
            return state
        })
    }
})
export default faqSlice.reducer
