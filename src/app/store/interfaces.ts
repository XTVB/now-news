import { AuthState } from "./auth/interfaces";
import { ContentState } from "./content/interfaces";

export interface RootState {
  authState: AuthState;
  contentState: ContentState;
}
