import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiReduxState } from './types';

const initialState: UiReduxState = {
    homeStage: 0,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        uiSetHomeStage: (state, action: PayloadAction<number>) => {
            state.homeStage = action.payload;
        },
    },
});

export type UiState = typeof initialState;

export default {
    actions: uiSlice.actions,
    reducers: uiSlice.reducer,
};
