import { createNavItems } from '../components/NavItem';
import { NavItemProps } from '../helpers/interfaces';

const linkClasses: Array<NavItemProps> = [
  {
    liStyles: 'header-nav__item',
    aStyles: ['header-nav__link'],
    alabel: 'To Garage',
    href: '#/',
  },

  {
    liStyles: 'header-nav__item',
    aStyles: ['header-nav__link'],
    alabel: 'To Winner',
    href: '#/winners/',
  },
];

export function createHeader(): string {
  const links = createNavItems(linkClasses);

  return `
    <header>
      <div class="container">
        <ul class="header-nav">
          ${links}
        </ul>
      </div>
    </header>
  `;
}
