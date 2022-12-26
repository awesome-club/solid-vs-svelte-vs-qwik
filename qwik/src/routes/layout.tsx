import { component$, useStylesScoped$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';
import styles from './layout.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="app">
	    <Header />
      <main>
        <Slot />
      </main>
    </div>
  );
});
