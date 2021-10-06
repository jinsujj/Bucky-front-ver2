import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@/components/Icons/SearchIcon';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import colors from '@/styles/colors';

/**
 * todo 최근 검색어나 자동완성 검색어 부분  ->
 *  1. api 가 나오면
 *  2. 최근 검색어는 프론트에서 구현가능하니 추후에
 */

function SearchForm() {
  const router = useRouter();
  const [defaultValue, setDefaultValue] = useState(router.query.keyword || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');

  const emitChangeDebounced = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 200);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    emitChangeDebounced(event);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = inputRef?.current?.value || '';
    if (!name.trim()) {
      return;
    }
    console.log(event, keyword, name);

    router.push({
      pathname: '/',
      query: {
        name,
      },
    });
  };

  // const clearValue = () => {};

  useEffect(() => {
    if (!router.query.name) {
      return;
    }
    setDefaultValue(router.query.name);
  }, [router.query.name]);

  return (
    <SearchFormBlock onSubmit={handleSubmit}>
      <SearchInputBlock>
        <Prefix>
          <SearchIcon />
        </Prefix>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="스튜디오를 입력해주세요"
          onChange={handleChange}
          defaultValue={defaultValue}
        />
      </SearchInputBlock>
    </SearchFormBlock>
  );
}

const SearchFormBlock = styled.form`
  max-width: 600px;
  width:100%;
  padding-left: 5px;
`;

const SearchInputBlock = styled.div`
  width: 100%;
  height: 40px;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 500;
  padding: 0 18px 0 24px;
  min-width: 64px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 20px;
  transition: background-color 0.2s, border-color 0.2s;
  display: inline-flex;
  flex-direction: row;
  overflow: hidden;
  cursor: text;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[400]};


  &:hover {
    border-color: ${colors.neon};
  }

  &:focus-within {
    border-color: ${colors.neon};
  }

  @media only screen and (max-width: 450px) {
    height: 35px;
  }
`;

const Prefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  outline: none;
  flex: 1 1 auto;
  width: 100%;
  background-image: none;
  box-sizing: border-box;
  font-size: inherit;
  border: none;
  font-weight: inherit;
  background-color: transparent;
  text-align: left;
  color: inherit;

  &::placeholder {
    color: ${colors.gray[400]};
  }
`;

export default SearchForm;
