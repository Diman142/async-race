import { NavItemProps } from '../helpers/interfaces';

export function createNavItems(itemsClasses: Array<NavItemProps>): string {
  const navItems: Array<string> = itemsClasses.map(item => {
    const link: HTMLElement = document.createElement('a');

    link.innerText = `${item.alabel}`;
    link.setAttribute('href', item.href);

    item.aStyles.forEach(style => {
      link.classList.add(style);
    });

    return `
      <li class="${item.liStyles}">
        ${link.outerHTML}
      </li>
    `;
  });

  return navItems.join(' ');
}
