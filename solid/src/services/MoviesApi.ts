const ApiKey = "2d9822ec42a661e9b83cbc5b7caab3cf";
const ApiPath = "https://api.themoviedb.org/3/";
export const PosterPath = "https://image.tmdb.org/t/p/w500/";

let VOTES = null as Map<string, Vote> | null;

export enum Vote {
  Up,
  Down,
  None,
}

export interface MovieDto {
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  vote: Vote;
}

export function findMovies(query: string) {
  return fetch(`${ApiPath}/search/movie?query=${query}&api_key=${ApiKey}`);
}

export function getMovieDetails(id: string) {
  return fetch(`${ApiPath}/movie/${id}?api_key=${ApiKey}`);
}

function fetchVotes() {
  const stored = localStorage.getItem("votes");
  VOTES = stored ? new Map(Object.entries(JSON.parse(stored))) : new Map();
}

function persistVotes() {
  localStorage.setItem("votes", JSON.stringify(Object.fromEntries(VOTES!)));
}

export function addVote(id: number, vote: Vote) {
  if (!VOTES) fetchVotes();
  VOTES?.set(`${id}`, vote);
  persistVotes();
}

export function getVote(id: number): Vote {
  if (!VOTES) fetchVotes();
  return VOTES?.get(`${id}`) ?? Vote.None;
}
