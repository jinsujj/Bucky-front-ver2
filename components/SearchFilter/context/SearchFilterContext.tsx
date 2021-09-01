import { groupItem } from '@/components/SearchFilter/SelectButtonGroup';
import React, { useContext, useReducer, createContext, Dispatch } from 'react';
export interface FilterParams {
  sex: groupItem[];
  people_num: groupItem[];
  colors: groupItem[];
  outdoor?: boolean;
}

export type GroupName = 'sex' | 'people_num' | 'colors';

export const defaultFilterState: FilterParams = {
  sex: [
    {
      name: '남',
      id: 1,
      selected: false,
      value: 'M',
    },
    {
      name: '여',
      id: 2,
      selected: false,
      value: 'F',
    },
    {
      name: '혼성',
      id: 3,
      selected: false,
      value: 'C',
    },
  ],
  people_num: [
    {
      name: '1인',
      id: 1,
      selected: false,
      value: 'ONE',
    },
    {
      name: '2인',
      id: 2,
      selected: false,
      value: 'TWO',
    },
    {
      name: '3인 이상',
      id: 3,
      selected: false,
      value: 'MANY',
    },
  ],
  colors: [
    {
      name: '무채색',
      id: 1,
      selected: false,
      value: 'ACHROMATIC',
    },
    {
      name: '비비드',
      id: 2,
      selected: false,
      value: 'VIVID',
    },
    {
      name: '파스텔',
      id: 3,
      selected: false,
      value: 'PASTEL',
    },
  ],
  outdoor: false,
};

type Action =
  | { type: 'TOGGLE_SELECT_GROUP'; payload: { id: number; groupName: GroupName } }
  | { type: 'TOGGLE_OUTDOOR' }
  | { type: 'SYNC_QUERY'; payload: { queryState: FilterParams } };

type FilterDispatch = Dispatch<Action>;

export const FilterStateContext = createContext<FilterParams>(defaultFilterState);
export const FilterDispatchContext = createContext<FilterDispatch | null>(null);

function toggleSelected(groupItems: groupItem[], id: number) {
  return groupItems.map((item) => {
    return item.id !== id
      ? {
          ...item,
        }
      : {
          ...item,
          selected: !item.selected,
        };
  });
}

function reducer(state: FilterParams, action: Action): FilterParams {
  switch (action.type) {
    case 'TOGGLE_SELECT_GROUP': {
      return {
        ...state,
        [action.payload.groupName]: toggleSelected(
          state[action.payload.groupName],
          action.payload.id
        ),
      };
    }
    case 'TOGGLE_OUTDOOR': {
      return {
        ...state,
        outdoor: !state.outdoor,
      };
    }
    case 'SYNC_QUERY': {
      return {
        ...defaultFilterState,
        ...action.payload.queryState,
      };
    }
    default:
      throw new Error('Unhandled action');
  }
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultFilterState);
  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

export function useSearchFilterState() {
  const state = useContext(FilterStateContext);
  return state;
}

export function useSearchFilterDispatch() {
  const dispatch = useContext(FilterDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find Provider');
  }
  return dispatch;
}
