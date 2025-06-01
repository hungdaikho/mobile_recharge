import { createSlice } from "@reduxjs/toolkit";

export interface IChargeItem {
    phone: string | number;
    amount: string | number;
}

export interface ICharge {
    type: string;
    charges: IChargeItem[];
}

const initialState: ICharge = {
    type: '',
    charges: []
}

const chargeSlice = createSlice({
    name: 'charge',
    initialState,
    reducers: {
        setCharge: (_state, action) => {
            return action.payload
        },
        updateChargeItem: (state, action) => {
            const { index, data } = action.payload;
            // Cập nhật type nếu có
            if (data.type !== undefined) {
                state.type = data.type;
            }
            // Cập nhật từng trường cho charge item
            if (state.charges && state.charges[index]) {
                state.charges[index] = {
                    ...state.charges[index],
                    ...data
                };
            } else {
                state.charges[index] = { phone: '', amount: '', ...data };
            }
            return state;
        },
        addChargeItem: (state, action) => {
            state.charges.push(action.payload);
        },
        removeChargeItem: (state, action) => {
            state.charges.splice(action.payload, 1);
        }
    }
})

export default chargeSlice.reducer;
export const { setCharge, updateChargeItem, addChargeItem, removeChargeItem } = chargeSlice.actions;