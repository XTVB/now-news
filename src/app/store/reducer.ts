import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./auth/reducer";
import { contentReducer } from "./content/reducer";
import { RootState } from "./interfaces";

export const rootReducer: ActionReducerMap<RootState> = {
  authState: authReducer,
  contentState: contentReducer,
};
