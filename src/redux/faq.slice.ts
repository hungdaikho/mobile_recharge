import { CreateFaqContentRequest, rechargeService, UpdateFaqContentRequest } from "@/services/recharge.service"
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
export const updateFaqContent = createAsyncThunk('faq/updateFaqContent', async ({ id, data }: { id: string, data: UpdateFaqContentRequest }) => {
    const response = await rechargeService.updateFaqContent(id, data)
    return response
})
export const createFaqContent = createAsyncThunk('faq/createFaqContent', async (data: CreateFaqContentRequest) => {
    const response = await rechargeService.createFaqContent(data)
    return response
})
export const deleteFaqContent = createAsyncThunk('faq/deleteFaqContent', async (id: string) => {
    const response = await rechargeService.deleteFaqContent(id)
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
