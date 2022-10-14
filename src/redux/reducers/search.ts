import { AnyAction } from "redux";

export type ListItemType = {
  loading: boolean;
  incomplete_results: boolean;
  items: [];
  total_count: number;
};

type SearchType = {
  loading: boolean;
  search: ListItemType;
};
const STATE: SearchType = {
  loading: false,
  search: {
    incomplete_results: false,
    items: [],
    total_count: 0,
    loading: false,
  },
};

export default (state: SearchType = STATE, { type, payload }: AnyAction) => {
  switch (type) {
    case SEARCH.LOADING: {
      return { ...state, loading: payload ?? false };
    }
    case SEARCH.SEARCH: {
      return { ...state, search: payload };
    }
    default:
      return state;
  }
};

export const SEARCH = {
  LOADING: "SEARCH.LOADING",
  SEARCH: "SEARCH.DATA",
};
