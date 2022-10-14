import axios from "axios";
import { SEARCH } from "../reducers/search";
import { AppDispatch } from "../store";

export const getSearch =
  (debouncedText: string): any =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: SEARCH.LOADING, payload: true });
    try {
      const data = await axios.get(
        `https://api.github.com/search/repositories?q=${debouncedText}`
      );
      dispatch({ type: SEARCH.SEARCH, payload: data.data });
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch({ type: SEARCH.LOADING, payload: false });
    }
  };
