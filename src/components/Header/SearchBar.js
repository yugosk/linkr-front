import React, { useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch } from "react-icons/ai";

import UserContext from "../../contexts/userContext";

import SearchResult from "./SearchResult";

export default function SearchBar() {
  const { getSession } = useContext(UserContext);
  const { token } = getSession();

  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [getLoading, setGetLoading] = useState(false);

  async function searchPeople(e) {
    const typedName = e.target.value;
    setName(typedName);
    setUsersList([]);
    setGetLoading(true);

    try {
      if (typedName.length !== 0) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users?name=${typedName}`,
          { headers: { Authorization: token } }
        );

        setUsersList(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setGetLoading(false);
    }
  }

  function resetSearch() {
    setUsersList([]);
    setName("");
  }

  return (
    <Container>
      <Input
        type="text"
        value={name}
        onChange={searchPeople}
        onFocus={(e) => {
          searchPeople(e);
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        placeholder="Search for people"
        minLength={3}
        debounceTimeout={300}
      />
      <AiOutlineSearch />
      {focused && (
        <SearchResult
          usersList={usersList}
          getLoading={getLoading}
          resetSearch={resetSearch}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0 28px;
  height: 44px;
  width: 100%;
  max-width: 560px;

  > svg {
    position: absolute;
    top: 8px;
    right: 10px;
    height: 28px;
    width: 28px;
    color: #c6c6c6;
  }

  @media (max-width: 612px) {
    position: absolute;
    top: 70px;
    width: calc(100% - 56px);
    margin: 0;
  }
`;

const Input = styled(DebounceInput)`
  position: absolute;
  padding: 0 44px 0 18px;
  border: none;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;

  &::placeholder {
    color: #c6c6c6;
  }
`;
