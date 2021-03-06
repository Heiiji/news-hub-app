import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { activeSearchVar } from "../apollo";
import { ACTIVE_SEARCH } from "../apollo/system/actions";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  button,
  input {
    font: 1em Hind, sans-serif;
    line-height: 1.5em;
  }
  input {
    color: #f1f1f1;
  }

  .search-bar {
    display: flex;
  }

  .search-bar input,
  .search-btn,
  .search-btn:before,
  .search-btn:after {
    transition: all 0.25s ease-out;
  }

  .search-bar input,
  .search-btn {
    width: 3em;
    height: 3em;
  }

  .search-bar input:invalid:not(:focus),
  .search-btn {
    cursor: pointer;
  }

  .search-bar,
  .search-bar input:focus,
  .search-bar input:valid {
    width: 100%;
  }

  .search-bar input:focus,
  .search-bar input:not(:focus) + .search-btn:focus {
    outline: transparent;
  }

  .search-bar {
    margin: auto;
    padding: 1.5em;
    justify-content: center;
    max-width: 30em;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  .search-bar input {
    background: transparent;
    border-radius: 1.5em;
    padding: 0.75em;
    transform: translate(0.5em, 0.5em) scale(0.5);
    transform-origin: 100% 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-shadow: 0 0 0 0.4em #f1f1f1 inset;
  }

  .search-bar input::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  .search-bar input:focus,
  .search-bar input:valid {
    border-radius: 0.375em 0 0 0.375em;
    transform: scale(1);
    background: #3d3d3d;
    box-shadow: 0 0 0 0.1em #3d3d3d inset;
  }

  input:focus::placeholder {
    color: grey;
  }

  .search-btn {
    border-radius: 0 0.75em 0.75em 0 / 0 1.5em 1.5em 0;
    padding: 0.75em;
    position: relative;
    transform: translate(0.25em, 0.25em) rotate(45deg) scale(0.25, 0.125);
    transform-origin: 0 50%;
    background: #f1f1f1;
  }

  .search-btn:before,
  .search-btn:after {
    content: "";
    display: block;
    opacity: 0;
    position: absolute;
  }

  .search-btn:before {
    border-radius: 50%;
    box-shadow: 0 0 0 0.2em #f1f1f1 inset;
    top: 0.75em;
    left: 0.75em;
    width: 1.2em;
    height: 1.2em;
  }

  .search-btn:after {
    background: #f1f1f1;
    border-radius: 0 0.25em 0.25em 0;
    top: 51%;
    left: 51%;
    width: 0.75em;
    height: 0.25em;
    transform: translate(0.2em, 0) rotate(45deg);
    transform-origin: 0 50%;
  }

  .search-btn span {
    display: inline-block;
    overflow: hidden;
    width: 1px;
    height: 1px;
  }

  /* Active state */

  .search-bar input:focus + .search-btn,
  .search-bar input:valid + .search-btn {
    background: #2762f3;
    border-radius: 0 0.375em 0.375em 0;
    transform: scale(1);
    cursor: pointer;
  }

  .search-bar input:focus + .search-btn:before,
  .search-bar input:focus + .search-btn:after,
  .search-bar input:valid + .search-btn:before,
  .search-bar input:valid + .search-btn:after {
    opacity: 1;
  }

  .search-bar input:focus + .search-btn:hover,
  .search-bar input:valid + .search-btn:hover,
  .search-bar input:valid:not(:focus) + .search-btn:focus {
    background: #0c48db;
  }

  .search-bar input:focus + .search-btn:active,
  .search-bar input:valid + .search-btn:active {
    transform: translateY(1px);
  }
`;

const SearchBar = () => {
  const { data } = useQuery(ACTIVE_SEARCH);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) {
      setSearch(data.search.query);
    }
  }, [data]);

  const _onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    activeSearchVar({
      ...activeSearchVar(),
      query: search,
    });
  };

  return (
    <StyledSearchBar>
      <form onSubmit={_onSubmit} action="" className="search-bar">
        <input
          type="search"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          name="search"
          placeholder="search"
        />
        <button className="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </StyledSearchBar>
  );
};

export default SearchBar;
