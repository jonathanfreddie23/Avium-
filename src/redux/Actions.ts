import authSlice from 'redux/slices/auth';
import homeSlice from 'redux/slices/home';
import uiSlice from 'redux/slices/ui';

export default {
    ...authSlice.actions,
    ...homeSlice.actions,
    ...uiSlice.actions,
};
