import { createMainPage } from '../pages/main';
import { createWinnerPage } from '../pages/winners';

export const locationResolver = (location: string): void => {
  switch (location) {
    case '#/':
      createMainPage();
      break;

    case '#/winners/':
      createWinnerPage();
      break;

    default:
  }
};
