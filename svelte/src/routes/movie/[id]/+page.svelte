<script lang="ts">
  import { PosterPath } from '../../../services/MoviesApi';
  import type { PageData } from './$types';
  export let data: PageData;

  console.log(data);
</script>

<article>
  <img src={`${PosterPath}${data.poster_path}`} alt={data.original_title} />

  <h1>{data.original_title}</h1>

  <p>{data.overview}</p>
</article>

<style lang="scss" scoped>
  article {
    text-align: center;
    img {
      width: 100%;
      border-radius: 12px;
    }
  }
</style>