import React from 'react';
import styled from '@emotion/styled';
import colors from '@/styles/colors';
import Button from '@/components/Button';
import GenderSelectGroup from './GenderSelectGroup';
import PepleSelectGroup from './PepleSelectGroup';
import ColorsSelectGroup from './ColorsSelectGroup';
import { rgba } from 'polished';
import { css } from '@emotion/react';
import {
  FilterParams,
  useSearchFilterDispatch,
  useSearchFilterState,
} from '@/components/SearchFilter/context/SearchFilterContext';
import useSearch from '@/hooks/images/useSearch';
import { GetSearchImageListParams } from '@/api/image';

const detransformFilterParams = (params: FilterParams) => {
  const paramToQuery: Pick<GetSearchImageListParams, 'people_num' | 'sex' | 'color' | 'outdoor'> = {
    people_num: [],
    sex: [],
    color: [],
    outdoor: false,
  };

  if (params.sex.some((item) => item.selected)) {
    paramToQuery.sex = params.sex.filter((item) => item.selected).map(({ value }) => value);
  }

  if (params.people_num.some((item) => item.selected)) {
    paramToQuery.people_num = params.people_num
      .filter((item) => item.selected)
      .map(({ value }) => value);
  }

  if (params.colors.some((item) => item.selected)) {
    paramToQuery.color = params.colors.filter((item) => item.selected).map(({ value }) => value);
  }

  if (params.outdoor) {
    paramToQuery.outdoor = true;
  }

  return paramToQuery;
};

const FilterMenus = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { search, searchParams } = useSearch();
  const state = useSearchFilterState();
  const dispatch = useSearchFilterDispatch();
  const handleFilterUpdate = () => {
    search({
      ...detransformFilterParams(state),
      ...(searchParams.name && { name: searchParams.name }),
      page: 1,
    });
  };

  const toggleOutdoor = () => dispatch({ type: 'TOGGLE_OUTDOOR' });

  return (
    <FilterMenusBlock {...props} ref={ref}>
      <Conatiner>
        <Wrapper>
          <GenderSelectGroup />
          <PepleSelectGroup />
          <ColorsSelectGroup />
          <OutdoorSelectButton selected={state.outdoor} onClick={toggleOutdoor}>
            야외촬영
          </OutdoorSelectButton>
          <Button onClick={handleFilterUpdate}>검색</Button>
        </Wrapper>
      </Conatiner>
    </FilterMenusBlock>
  );
});

const FilterMenusBlock = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: none;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
`;

const Conatiner = styled.div`
  width: 1180px;
  height: 80px;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  @media only screen and (max-width: 1250px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -6px;
`;

const OutdoorSelectButton = styled(Button)<{ selected?: boolean }>`
  height: 40px;
  margin: 0 10px;
  &:hover,
  &:focus-visible {
    background-color: ${rgba(colors.neon, 0.1)};
    border-color: ${colors.neon};
  }
  &:active {
    background-color: ${rgba(colors.neon, 0.2)};
    border-color: ${colors.neon};
  }
  ${({ selected }) =>
    selected &&
    css`
      border-color: ${colors.neon};
      color: ${colors.gray[500]};
      font-weight: bold;
      font-weight: 500;
    `}
`;

export default FilterMenus;
