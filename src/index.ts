import './styles/styles.scss';
import { locationResolver } from './ts/helpers/router';
import { createHeader } from './ts/containers/Header';

document.addEventListener('DOMContentLoaded', () => {
  const body: HTMLElement | null = document.querySelector('body');

  body?.insertAdjacentHTML('afterbegin', createHeader());

  window.addEventListener('load', () => {
    let location = window.location.hash;

    if (!location.length) {
      location = '#/';
    }

    locationResolver(location);
  });

  window.addEventListener('hashchange', () => {
    const location = window.location.hash;

    if (location) {
      locationResolver(location);
    }
  });
});
