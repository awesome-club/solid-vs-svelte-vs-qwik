import { component$, useSignal, useClientEffect$, useStylesScoped$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { addVote, findMovies, getVote, MovieDto, PosterPath, Vote } from '~/services/MoviesApi';
import styles from './index.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const movies = useSignal([] as MovieDto[]);

  useClientEffect$(async () => {
    const response = await findMovies("christmas");
    const data = await response.json();
    console.log(data);
    movies.value = (data.results as MovieDto[]).map(it => ({
      ...it,
      vote: getVote(it.id)
    }));
    console.log(movies.value);
  });

  const vote = $((movie: MovieDto, vote: Vote) => {
    addVote(movie.id, vote);
    movie.vote = vote;
    movies.value = [...movies.value];
  });

  return (
    <div>
      {movies.value.map(movie => 
      <article class={movie.vote !== Vote.None ? "voted" : ""}>
        <img src={`${PosterPath}${movie.poster_path}`} alt={movie.original_title} />

        {movie.vote === Vote.Up && <span class="vote">👏</span>}
        {movie.vote === Vote.Down && <span class="vote">💩</span>}
        <footer>
          <h3>
            <a href={`/movie/${movie.id}`}>{movie.original_title}</a>
          </h3>

          {movie.vote === Vote.None &&
          <nav>
            <button onClick$={() => vote(movie, Vote.Up)}>👏</button>
            <button onClick$={() => vote(movie, Vote.Down)}>💩</button>
          </nav>}
        </footer>
    </article>)}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Christmas Movies",
  meta: [
    {
      name: "description",
      content: "best christmas movies",
    },
  ],
};
