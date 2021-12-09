import axios from "axios";
import { observable, action } from "mobx";
import { Movie, MoviesResponse } from "../interfaces/response/movies-response";
import { UrlParams } from "../interfaces/store/url-params";

class Store {
  @observable movies: Movie[] = [];
  @observable total: number = 0;

  urlParams: UrlParams = {
    limit: 10,
    offset: 0,
  };

  getUrlParamKeys(): string[] {
    return Object.keys(this.urlParams);
  }

  isLastElement(index: number): boolean {
    return this.getUrlParamKeys().length === index + 1;
  }

  createUrlString(): string {
    return `/movies?${this.getUrlParamKeys()
      .map(
        (urlParam: string, index: number) =>
          `${urlParam}=${this.urlParams[urlParam as keyof UrlParams]}${
            this.isLastElement(index) ? "" : "&"
          }`
      )
      .join("")}`;
  }

  @action
  updateFilter(filter?: string): void {
    if (filter) {
      this.urlParams.filter = filter;
    } else {
      delete this.urlParams.filter;
    }
    this.updateMovies();
  }

  @action
  updateSearch(search: string): void {
    if (search) {
      this.urlParams.search = search;
    } else {
      delete this.urlParams.search;
    }
    this.updateMovies();
  }

  @action
  updateSort(sort: string): void {
    this.urlParams.sort = sort;
    this.updateMovies();
  }

  @action
  updateOffset(offset: number): void {
    this.urlParams.offset = offset;
    this.updateMovies();
  }

  @action
  updateLimit(limit: number): void {
    this.urlParams.limit = limit;
    this.updateMovies();
  }

  @action
  updateMovies(): void {
    axios.get(this.createUrlString()).then((result) => {
      const data: MoviesResponse = result.data;
      const movies: Movie[] = data.data;

      this.movies = movies;
      this.total = data.totalAmount;
    });
  }
}

const storeInstance = new Store();
export default storeInstance;
