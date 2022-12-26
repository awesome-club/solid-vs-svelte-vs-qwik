import { createResource, createSignal, onMount } from "solid-js";
import { Title } from "solid-start";
import { addVote, findMovies, getVote, MovieDto, PosterPath, Vote } from "~/services/MoviesApi";
import styles from "./index.module.scss";

export default function Home() {
  const [movies, setMovies] = createSignal([] as MovieDto[]);

  onMount(async () => {
    const response = await findMovies("christmas");
		const data = await response.json();
    setMovies((data.results as MovieDto[]).map(it => ({
      ...it,
      vote: getVote(it.id)
    })));
  })

  function vote(movie: MovieDto, vote: Vote) {
    addVote(movie.id, vote);
    movie.vote = vote;
    setMovies(movies());
  }

  return (
    <>
    <Title>Christmas Movies</Title>
      {movies().map(movie => 
      <article class={`${styles.movie} ${movie.vote !== Vote.None ? styles.voted : ""}`}>
        <img src={`${PosterPath}${movie.poster_path}`} alt={movie.original_title} />

        {movie.vote === Vote.Up && <span class={styles.vote}>👏</span>}
        {movie.vote === Vote.Down && <span class={styles.vote}>💩</span>}
        <footer>
          <h3>
            <a href={`/movie/${movie.id}`}>{movie.original_title}</a>
          </h3>

          {movie.vote === Vote.None &&
          <nav>
            <button onClick={() => vote(movie, Vote.Up)}>👏</button>
            <button onClick ={() => vote(movie, Vote.Down)}>💩</button>
          </nav>}
        </footer>
    </article>)}
    </>
  );
}
