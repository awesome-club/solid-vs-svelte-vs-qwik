import { component$, useSignal, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { getMovieDetails, MovieDto, PosterPath } from '~/services/MoviesApi';
import { useLocation } from '@builder.io/qwik-city';
import styles from './index.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const location = useLocation();
  const data = useSignal(null as MovieDto | null);

  useTask$(async () => {
    const response = await getMovieDetails(location.params.id);
    data.value = await response.json();
  });

  return <article>
      <img src={`${PosterPath}${data.value?.poster_path}`} alt={data.value?.original_title} />

      <h1>{data.value?.original_title}</h1>

      <p>{data.value?.overview}</p>
    </article>
});