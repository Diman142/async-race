import { renderTable } from '../containers/Table';
import { getTableData, store } from '../helpers/store';

function addPaginationListeners(): void {
  const prevBtn = document.getElementById('prevTable') as HTMLButtonElement;
  const nextBtn = document.getElementById('nextTable') as HTMLButtonElement;

  prevBtn?.addEventListener('click', async () => {
    if (store.winnersPage > 1) {
      store.winnersPage -= 1;
      renderTable('table-wrap');
    }
  });

  nextBtn?.addEventListener('click', async () => {
    if (+store.winnersCount > store.winnersPage * 10) {
      store.winnersPage += 1;
      renderTable('table-wrap');
    }
  });
}

export async function createWinnerPage(): Promise<void> {
  const main = document.querySelector('main');
  await getTableData();

  if (main) main.remove();

  const html = `
  <main>
    <div class="container">
      <div class="table-wrap" id="table-wrap">
      </div>
      <button class="btn btn_prev" id="prevTable">Prev</button>
      <button class="btn btn_next" id="nextTable">Next</button>
    </div>
  </main>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  addPaginationListeners();
  renderTable('table-wrap');
}
