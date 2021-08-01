import { getCars, getWinners } from './api';
import { StoreInterface, WinnerProps, CarState, CarProprs } from './interfaces';

export const store: StoreInterface = {
  cars: [],
  carsCount: '0',
  updatingCar: null,
  page: 1,
  animation: [],
  winners: [],
  winnersPage: 1,
  winnersCount: 0,
  winnersOrder: 'ASC',
  winnersSort: 'time',
  isFinished: false,
  isRaceStarted: false,
  carsState: [],
  createInputNameValue: '',
  createInputColorValue: '#ffffff',
  updateInputNameValue: '',
  updateInputColorValue: '#ffffff',
  isRaceBtnActive: true,
};

export async function createStoreData(): Promise<void> {
  const res = await getCars(store.page);

  store.cars = res.items as unknown as Array<CarProprs>;
  store.carsCount = res.count as string;
  store.cars.forEach(item => {
    store.carsState.forEach(el => {
      if (item.id) {
        if (el.id.toString() === item.id.toString()) {
          if (el.isEngineStarted) item.isEngineStarted = el.isEngineStarted;
          if (el.transtaleX) item.translateX = el.transtaleX;
        }
      }
    });
  });
}

export async function getTableData(): Promise<void> {
  try {
    const res = (await getWinners(
      store.winnersPage,
      10,
      store.winnersSort,
      store.winnersOrder,
    )) as unknown as Array<WinnerProps>;
    store.winners = [...res.items];
    store.winnersCount = res.count;
  } catch (e) {
    throw Error(e);
  }
}

export function saveCarState(carState: CarState): void {
  let isFind = false;

  store.carsState.forEach(state => {
    if (state.id === carState.id) {
      isFind = true;
      if (carState.isEngineStarted !== undefined) state.isEngineStarted = carState.isEngineStarted;
      if (carState.transtaleX !== undefined) state.transtaleX = carState.transtaleX;
    }
  });

  if (!isFind) store.carsState.push(carState);
}
