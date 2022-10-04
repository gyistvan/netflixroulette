import React from "react";
import axios from "axios";
import { observable, action, makeObservable } from "mobx";
import { Movie, MoviesResponse } from "../interfaces/response/movies-response";
import { UrlParams } from "../interfaces/store/url-params";
import { SortOption } from "../components/sort/sort-props";

export const sortOptions: SortOption[] = [
  { title: "Release date", order: "asc", query: "release_date" },
  { title: "Release date", order: "desc", query: "release_date" },
  { title: "Title", order: "asc", query: "title" },
  { title: "Title", order: "desc", query: "title" },
  { title: "Rating", order: "asc", query: "vote_average" },
  { title: "Rating", order: "desc", query: "vote_average" },
];

export const GENRES = [
  "All",
  "Documentary",
  "Comedy",
  "Horror",
  "Crime",
  "SciFi",
];

export default class Store {
  movies: Movie[] = [];
  total: number = 0;
  genres: string[] = GENRES;
  offset: number = 1;
  limit: number = 10;
  search: undefined | string;
  searchBy: undefined | string;
  filter: undefined | string;
  sortBy: string = "title";
  sortOrder: string = "asc";
  sortTitle: string = "Title";
  isEditModalOpen: boolean = false;
  isAddModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  selectedMovieId: number | undefined;

  constructor() {
    makeObservable(this, {
      movies: observable,
      total: observable,
      offset: observable,
      limit: observable,
      search: observable,
      filter: observable,
      sortBy: observable,
      sortOrder: observable,
      genres: observable,
      isEditModalOpen: observable,
      isAddModalOpen: observable,
      isDeleteModalOpen: observable,
      selectedMovieId: observable,
      setMoviesList: action,
      setIsEditModalOpen: action,
      setIsAddModalOpen: action,
      setIsDeleteModalOpen: action,
      setTotal: action,
      updateFilter: action,
      updateLimit: action,
      updateOffset: action,
      updateSearch: action,
      updateSort: action,
    });
  }

  setSelectedMovieId(id: number) {
    this.selectedMovieId = id;
  }

  setIsEditModalOpen(bool: boolean) {
    console.log("fdsaafds");
    this.isEditModalOpen = bool;
  }

  setIsAddModalOpen(bool: boolean) {
    console.log("fdsaafds", bool);
    this.isAddModalOpen = bool;
    console.log(this.isAddModalOpen);
  }

  setIsDeleteModalOpen(bool: boolean) {
    this.isDeleteModalOpen = bool;
  }

  deleteEmptyKeys(urlParams: UrlParams): UrlParams {
    let clearedUrlParams: UrlParams = {};
    Object.keys(urlParams)
      .filter((key: string) => urlParams[key as keyof UrlParams] !== undefined)
      .forEach((key: string) => {
        Object.assign(clearedUrlParams, {
          [key]: urlParams[key as keyof UrlParams],
        });
      });

    return clearedUrlParams;
  }

  createUrlString(): string {
    let urlParams: UrlParams = {
      limit: this.limit,
      offset: this.offset,
      search: this.search,
      filter: this.filter,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      searchBy: this.searchBy,
    };
    urlParams = this.deleteEmptyKeys(urlParams);

    return `/movies?${Object.keys(urlParams)
      .filter(
        (urlParam: string) =>
          urlParams[urlParam as keyof UrlParams] !== undefined
      )
      .map((urlParam: string, index: number) => {
        return `${urlParam}=${urlParams[urlParam as keyof UrlParams]}${
          index === Object.keys(urlParams).length - 1 ? "" : "&"
        }`;
      })
      .join("")}`;
  }

  updateFilter = (filter?: string): void => {
    filter === "All" ? (this.filter = undefined) : (this.filter = filter);
    this.updateOffset(1);
  };

  updateSearch = (search: string): void => {
    if (search) {
      this.search = search;
      this.searchBy = "title";
    } else {
      this.search = undefined;
      this.searchBy = undefined;
    }
    this.updateOffset(1);
  };

  updateSort = (sortOption: SortOption): void => {
    this.sortBy = sortOption.query;
    this.sortOrder = sortOption.order;
    this.sortTitle = sortOption.title;
    this.updateMovies();
  };

  updateOffset = (offset: number): void => {
    this.offset = offset;
    this.updateMovies();
  };

  updateLimit = (limit: number): void => {
    this.limit = limit;
    this.updateOffset(1);
  };

  setMoviesList = (movies: Movie[]) => {
    this.movies = movies;
  };

  setTotal = (total: number) => {
    this.total = total;
  };

  updateMovies(): void {
    axios.get(this.createUrlString()).then((result) => {
      const data: MoviesResponse = result.data;
      const movies: Movie[] = data.data;

      this.setMoviesList(movies);
      this.setTotal(data.totalAmount);
    });
  }
}

const storeInstance = new Store();

const StoreContext = React.createContext(storeInstance);

export const StoreProvider = (props: {
  children: JSX.Element;
  store: Store;
}) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
