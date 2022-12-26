import { createRouteData, RouteDataArgs, useRouteData } from "solid-start";
import { getMovieDetails, MovieDto, PosterPath } from "~/services/MoviesApi";
import styles from "./movie.module.scss";

export function routeData({params}: RouteDataArgs) {
  return createRouteData(async () => {
    const response = await getMovieDetails(params.id);
    return await response.json() as MovieDto;
  });
}

export default function Movie() {
  const movie = useRouteData<typeof routeData>();

  return <article class={styles.movie}>
    {movie.loading && <span>Loading...</span>}

    <img src={`${PosterPath}${movie()?.poster_path}`} alt={movie()?.original_title} />
    <h1>{movie()?.original_title}</h1>
    <p>{movie()?.overview}</p>
  </article>
}