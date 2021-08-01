import { createRow } from '../components/Row';
import { store } from '../helpers/store';

function createTable(): string {
  return `
    <table id="table">
      <thead>
        <tr>
          <th id="table-num">Number</th>
          <th id="table-car">Car</th>
          <th id="tabel-name">Name</th>
          <th id="table-wins">Wins</th>
          <th id="table-best">Best Time</th>
        </tr>
      </thead>
    </table>
  `;
}

async function sortBestHandler(): Promise<void> {
  store.winnersSort = 'time';
  if (store.winnersOrder === 'ASC') {
    store.winnersOrder = 'DESC';
  } else {
    store.winnersOrder = 'ASC';
  }
  const oldBody = document.querySelector('.table-body');
  const newBody = await createRow();

  oldBody?.insertAdjacentHTML('beforebegin', newBody);
  oldBody?.remove();
}

async function sortWinsHandler(): Promise<void> {
  store.winnersSort = 'wins';
  if (store.winnersOrder === 'ASC') {
    store.winnersOrder = 'DESC';
  } else {
    store.winnersOrder = 'ASC';
  }
  const oldBody = document.querySelector('.table-body');
  const newBody = await createRow();

  oldBody?.insertAdjacentHTML('beforebegin', newBody);
  oldBody?.remove();
}

function addTableListeners() {
  const winsRow = document.getElementById('table-wins') as HTMLElement;
  const bestRow = document.getElementById('table-best') as HTMLElement;

  bestRow.addEventListener('click', sortBestHandler);
  winsRow.addEventListener('click', sortWinsHandler);
}

export async function renderTable(selector: string): Promise<void> {
  const root = document.getElementById(selector) as HTMLElement;
  const html = createTable();
  const mainTitle = `<h1 class="main__title">Winners (${store.winnersCount})</h1>`;
  const pageTitle = `<h3 class="main__page">Page #${store.winnersPage}</h3>`;

  const rows = await createRow();
  root.innerHTML = '';

  root.insertAdjacentHTML('afterbegin', pageTitle);
  root.insertAdjacentHTML('afterbegin', mainTitle);
  root.insertAdjacentHTML('beforeend', html);

  const table = document.getElementById('table') as HTMLTableElement;
  table.insertAdjacentHTML('beforeend', rows);

  addTableListeners();
}
