import { error } from "@sveltejs/kit";
import { getMovieDetails } from "../../../services/MoviesApi";
import type { PageLoad } from "./$types";

export const load = (async ({ params }) => {
  try {
    const response = await getMovieDetails(params.id);
    return await response.json();
  } catch (err) {
    throw error(404, "Not found");
  }
}) satisfies PageLoad;
