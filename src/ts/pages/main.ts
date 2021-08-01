import { renderGarage } from '../components/Car';
import { getCars } from '../helpers/api';
import { store, createStoreData } from '../helpers/store';
import { renderPanel } from '../components/Panel';
import { addDisableToBtn, removeDisableToBtn } from '../helpers/utils';
import { CarProprs } from '../helpers/interfaces';

function addPaginationListeners(): void {
  const prevBtn = document.getElementById('prev') as HTMLButtonElement;
  const nextBtn = document.getElementById('next') as HTMLButtonElement;

  prevBtn?.addEventListener('click', async () => {
    if (store.page > 1) {
      store.isFinished = false;
      store.isRaceBtnActive = true;
      store.page -= 1;
      store.carsState = [];

      const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
      const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
      removeDisableToBtn(raceBtn, 'btn_disabled');
      addDisableToBtn(resetBtn, 'btn_disabled');

      const res = await getCars(store.page);
      store.cars = res.items as unknown as Array<CarProprs>;
      renderGarage(store.cars, 'garage');
    }
  });

  nextBtn?.addEventListener('click', async () => {
    if (+store.carsCount > store.page * 7) {
      store.isFinished = false;
      store.isRaceBtnActive = true;
      store.page += 1;
      store.carsState = [];

      const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
      const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
      removeDisableToBtn(raceBtn, 'btn_disabled');
      addDisableToBtn(resetBtn, 'btn_disabled');

      const res = await getCars(store.page);
      store.cars = res.items as unknown as Array<CarProprs>;
      renderGarage(store.cars, 'garage');
    }
  });
}

export async function createMainPage(): Promise<void> {
  const main = document.querySelector('main');
  store.isFinished = false;
  await createStoreData();

  if (main) main.remove();

  const html = `
  <main>
    <div class="container">

      <div class="garage" id="garage"></div>
      <button class="btn btn_prev" id="prev">Prev</button>
      <button class="btn btn_next" id="next">Next</button>

    </div>
  </main>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  addPaginationListeners();
  renderPanel('garage');
  renderGarage(store.cars, 'garage');
}
