import { UiState } from '.';

const getHomeStage = (state: UiState): number => state.homeStage || 0;

export default {
    getHomeStage,
};
