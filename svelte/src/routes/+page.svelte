<script lang="ts">
  import { addVote, findMovies, getVote, PosterPath, Vote } from '../services/MoviesApi';
  import type { MovieDto } from "../services/MoviesApi";
  import { onMount } from 'svelte';

  let movies = [] as MovieDto[];

  onMount(async () => {
		const response = await findMovies("christmas");
		const data = await response.json();
    movies = (data.results as MovieDto[]).map(it => ({
      ...it,
      vote: getVote(it.id)
    }));
	});

  function vote(movie: MovieDto, vote: Vote) {
    addVote(movie.id, vote);
    movie.vote = vote;
    movies = [...movies];
  }
</script>

<svelte:head>
	<title>Christmas Movies</title>
	<meta name="description" content="best christmas movies" />
</svelte:head>

<section>
	{#each movies as movie}
    <article class:voted={movie.vote !== Vote.None}>
      <img src={`${PosterPath}${movie.poster_path}`} alt={movie.original_title} />

      {#if movie.vote === Vote.Up}
        <span class="vote">👏</span>
      {/if}

      {#if movie.vote === Vote.Down}
        <span class="vote">💩</span>
      {/if}

      <footer>
        <h3>
          <a href={`/movie/${movie.id}`}>{movie.original_title}</a>
        </h3>
        {#if movie.vote === Vote.None}
        <nav>
          <button on:click={() => vote(movie, Vote.Up)}>👏</button>
          <button on:click={() => vote(movie, Vote.Down)}>💩</button>
        </nav>
        {/if}
      </footer>
    </article>
  {:else}
    <p>Loading...</p>
  {/each}
</section>

<style lang="scss" scoped>
  article {
    position: relative;
    margin-bottom: 30px;

    &.voted {
      img {
        opacity: .75;
      }
    }

    .vote {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 5px;
      font-size: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .5);
      border-radius: 15px;
    }

    img {
      border-radius: 15px;
      width: 100%;
    }

    h3 {
      margin: 0;
      a {
        display: inline-block;
        color: #FFF;
        text-decoration: none;
        font-size: 18px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 275px;
        overflow: hidden;
      }
    }

    nav {
      margin: 10px 0 0;
    }

    footer {
      position: absolute;
      padding: 200px 15px 15px;
      border-radius: 0 0 15px 15px;
      left: 0;
      right: 0;
      bottom: 5px;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8));

      button {
        background: rgba(0, 0, 0, .25);
        border: 0;
        border-radius: 6px;
        font-size: 22px;
        width: 36px;
        height: 36px;
        transition: all .25s;

        &:hover {
          background: rgba(0, 0, 0, .5);
        }
      }
    }
  }
</style>
