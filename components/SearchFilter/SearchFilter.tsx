import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import FilterIcon from '@/components/Icons/FilterIcon';
import FilterMenus from './FilterMenus';
import colors from '@/styles/colors';
import ArrowDown from '../Icons/ArrowDown';
import { css } from '@emotion/react';
import {
  defaultFilterState,
  useSearchFilterDispatch,
} from '@/components/SearchFilter/context/SearchFilterContext';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function detransformQueryToFilterState(query: ParsedUrlQuery) {
  const filterState = {
    ...defaultFilterState,
  };

  if (query.sex) {
    const sexValueSet = new Set((query.sex as string).split(','));
    filterState.sex = filterState.sex.map((item) => ({
      ...item,
      selected: sexValueSet.has(item.value),
    }));
  }

  if (query.color) {
    const colorValueSet = new Set((query.color as string).split(','));
    filterState.colors = filterState.colors.map((item) => ({
      ...item,
      selected: colorValueSet.has(item.value),
    }));
  }

  if (query.people_num) {
    const peopleNumValueSet = new Set((query.people_num as string).split(','));
    filterState.people_num = filterState.people_num.map((item) => ({
      ...item,
      selected: peopleNumValueSet.has(item.value),
    }));
  }

  if (query.outdoor) {
    filterState.outdoor = query.outdoor === 'true';
  }

  return filterState;
}

function SearchFilter() {
  const router = useRouter();
  const dispatch = useSearchFilterDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggleFilter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref && ref.current?.contains(event.target as Node)) {
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // close 될 때 state query에 맞춰서 초기화
    if (!isOpen) {
      dispatch({
        type: 'SYNC_QUERY',
        payload: {
          queryState: {
            ...detransformQueryToFilterState(router.query),
          },
        },
      });
    }
  }, [isOpen, dispatch, router.query]);

  useEffect(() => {
    dispatch({
      type: 'SYNC_QUERY',
      payload: {
        queryState: {
          ...detransformQueryToFilterState(router.query),
        },
      },
    });
  }, [router.query, dispatch]);

  return (
    <SearchFilterBlock onClick={toggleFilter}>
      <LeftWrapper>
        <FilterIcon />
        {/* <Label>필터로 검색하기</Label> */}
      </LeftWrapper>
      <ArrowWrapper isOpen={isOpen}>
        <ArrowDown />
      </ArrowWrapper>
      {isOpen && <FilterMenus ref={ref} />}
    </SearchFilterBlock>
  );
}

const SearchFilterBlock = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12px 18px 12px 20px;
  margin-right: 20px;
  background-color: ${colors.gray[100]};
  border: 1px solid ${colors.gray[300]};
  border-radius: 50px;
  &:hover {
    font-weight: 500;
    background-color: ${colors.gray[200]};
    border-color: ${colors.gray[400]};
  }
`;

const LeftWrapper = styled.div``;

// const Label = styled.label`
//   margin-left: 10px;
//   color: ${colors.gray[400]};
// `;

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${colors.gray[400]};
  transform: rotate(${180}deg);
  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(${0}deg);
    `}
`;

export default SearchFilter;
