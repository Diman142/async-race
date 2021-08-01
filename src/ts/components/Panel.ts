import { store, saveCarState } from '../helpers/store';
import { postCar, updateCar, startEngine, drive, stopEngine } from '../helpers/api';
import {
  addToGarageCar,
  createCar,
  selectBtnHandler,
  removeBtnHandler,
  stoptBtnHandler,
  startCarHandler,
} from './Car';
import { CarProprs } from '../helpers/interfaces';
import {
  getDistance,
  animate,
  addDisableToBtn,
  removeDisableToBtn,
  getRandomName,
  getRandomColor,
} from '../helpers/utils';

function createPanel(): string {
  return `
    <div class="panel" id="panel">
      <div class="panel-create">
        <input type="text" class="panel__name panel__name_create" id="createName"
        value="${store.createInputNameValue}">
        <input type="color" id="createColor" class="panel__color panel__color_create"
        value="${store.createInputColorValue}"/>
        <button class="panel__btn panel__btn_create" id="createBtn">Create</button>
      </div>
      <div class="panel-update">
        <input type="text" class="panel__name panel__name_update" id="updateName"
        value="${store.updateInputNameValue}">
        <input type="color" id="updateColor" class="panel__color panel__color_update"
        value="${store.updateInputColorValue}">
        <button class="panel__btn panel__btn_update" id="updateBtn">Update</button>
      </div>
      <div class="panel-race" id="race">
        <button class="panel__btn panel__btn_race" id="raceBtn"
        ${!store.isRaceBtnActive ? 'disabled' : ''}>Race</button>
        <button class="panel__btn panel__btn_reset" id="resetBtn"
        ${store.isRaceBtnActive ? 'disabled' : ''}>Reset</button>
        <button class="panel__btn panel__btn_generate" id="generateBtn">Generate Car</button>
      </div>
    </div>
  `;
}

async function creaBtnHandler(): Promise<void> {
  const nameInput = document.getElementById('createName') as HTMLInputElement;
  const colorInput = document.getElementById('createColor') as HTMLInputElement;

  const carData = {
    name: nameInput.value,
    color: colorInput.value,
  };

  try {
    const res: CarProprs = await postCar(carData);
    store.cars.push(res);
    store.carsCount = res.id?.toString() || 'default';
    addToGarageCar(res, store.carsCount);
    nameInput.value = '';
    store.createInputNameValue = '';
  } catch (e) {
    throw Error(e);
  }
}

async function updateBtnHamdler() {
  if (store.updatingCar) {
    const updateNameInput = document.getElementById('updateName') as HTMLInputElement;
    const updateColorInput = document.getElementById('updateColor') as HTMLInputElement;
    const updCar = { ...store.updatingCar } as CarProprs;
    updCar.name = updateNameInput.value;
    updCar.color = updateColorInput.value;

    if (updCar.id) {
      store.cars = store.cars.map((item: CarProprs) => {
        if (item.id === updCar.id) return updCar;
        return item;
      });

      const car = document.getElementById(updCar.id) as HTMLElement;
      const newCar = createCar(updCar);

      car.insertAdjacentHTML('afterend', newCar);
      car.remove();

      await updateCar(updCar.id, updCar);

      const newCarSelectBtn = document.getElementById(`select-car-${updCar.id}`);
      const newCarRemoveBtn = document.getElementById(`remove-car-${updCar.id}`);
      const newCarStartBtn = document.getElementById(`start-car-${updCar.id}`);
      const newCarStopBtn = document.getElementById(`stop-car-${updCar.id}`);

      newCarRemoveBtn?.addEventListener('click', removeBtnHandler);
      newCarSelectBtn?.addEventListener('click', selectBtnHandler);
      newCarStartBtn?.addEventListener('click', startCarHandler);
      newCarStopBtn?.addEventListener('click', stoptBtnHandler);
    }
    updateNameInput.value = '';
    store.updateInputNameValue = '';
    store.updatingCar = null;
  }
}

function startAll() {
  const startAllBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  if (startAllBtn) addDisableToBtn(startAllBtn, 'btn_disabled');
  if (resetBtn) removeDisableToBtn(resetBtn, 'btn_disabled');
  store.isRaceBtnActive = false;
  store.isRaceStarted = true;

  store.cars.forEach(async car => {
    if (car.id) {
      const carNode = document.getElementById(car.id) as HTMLElement;
      const carIcon = carNode.querySelector('.car-icon') as HTMLElement;
      const finishflag = carNode.querySelector('.road__flag') as HTMLElement;
      const start = carNode.querySelector('.road__btn_start') as HTMLButtonElement;
      const stop = carNode.querySelector('.road__btn_stop') as HTMLButtonElement;

      addDisableToBtn(start, 'btn_disabled');
      removeDisableToBtn(stop, 'btn_disabled');

      const distance = getDistance(carIcon, finishflag);
      const res = await startEngine(car.id);
      const animationDuration = res.distance / res.velocity;
      animate(carIcon, distance, animationDuration, car.name, +car.id);

      try {
        await drive(car.id);
      } catch (err) {
        const animationObj = store.animation.find(item => {
          if (item.id === carIcon.id) return true;
          return false;
        });
        if (animationObj) cancelAnimationFrame(animationObj?.frameId);
        saveCarState({ id: +car.id, transtaleX: carIcon.style.transform, isEngineStarted: true });
      }
    }
  });
}

function resetAll(e: Event) {
  const startAllBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const target = e.target as HTMLButtonElement;
  addDisableToBtn(target, 'btn_disabled');
  store.isRaceBtnActive = true;
  store.cars.forEach(async car => {
    if (car.id) {
      const carNode = document.getElementById(car.id) as HTMLElement;
      const carIcon = carNode.querySelector('.car-icon') as HTMLElement;
      const startCarBtn = carNode.querySelector('.road__btn_start') as HTMLButtonElement;
      const stoptCarBtn = carNode.querySelector('.road__btn_stop') as HTMLButtonElement;

      store.animation.forEach(item => {
        if (item.frameId) cancelAnimationFrame(item.frameId);
      });

      carIcon.style.transform = `translateX(0px)`;

      try {
        await stopEngine(car.id);
        addDisableToBtn(stoptCarBtn, 'btn_disabled');
        removeDisableToBtn(startCarBtn, 'btn_disabled');
        removeDisableToBtn(startAllBtn, 'btn_disabled');
        store.isFinished = false;
        car.isEngineStarted = false;
        saveCarState({ id: +car.id, transtaleX: 'translateX(0px)', isEngineStarted: false });
      } catch (err) {
        throw Error(err);
      }
    }
  });
}

async function generateCarHandel() {
  const requests = [];
  for (let i = 0; i < 100; i++) {
    const obj: CarProprs = {
      name: getRandomName(),
      color: getRandomColor(),
    };

    requests.push(postCar(obj));
  }

  try {
    const res = await Promise.all(requests);
    let storeCarCount = document.querySelectorAll('.car').length;

    res.forEach(car => {
      if (storeCarCount < 7) {
        store.cars.push(car);
        storeCarCount += 1;
      }
      store.carsCount = car.id?.toString() || 'default';
      addToGarageCar(car, store.carsCount);
    });
  } catch (e) {
    throw Error(e);
  }
}

function changeCreateNameValue(e: Event) {
  const target = e.target as HTMLInputElement;
  store.createInputNameValue = target.value;
}

function changeCreateColorValue(e: Event) {
  const target = e.target as HTMLInputElement;
  store.createInputColorValue = target.value;
}

function changeUpdateNameValue(e: Event) {
  const target = e.target as HTMLInputElement;
  store.updateInputNameValue = target.value;
}

function changeUpdateColorValue(e: Event) {
  const target = e.target as HTMLInputElement;
  store.updateInputColorValue = target.value;
}

function addPanelListeners() {
  const createBtn = document.getElementById('createBtn') as HTMLButtonElement;
  const updateBtn = document.getElementById('updateBtn') as HTMLButtonElement;
  const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
  const createNameInput = document.getElementById('createName') as HTMLInputElement;
  const createColorInput = document.getElementById('createColor') as HTMLInputElement;
  const updateNameInput = document.getElementById('updateName') as HTMLInputElement;
  const updateColorInput = document.getElementById('updateColor') as HTMLInputElement;

  createBtn.addEventListener('click', creaBtnHandler);
  updateBtn.addEventListener('click', updateBtnHamdler);
  raceBtn.addEventListener('click', startAll);
  resetBtn.addEventListener('click', resetAll);
  generateBtn.addEventListener('click', generateCarHandel);
  createNameInput.addEventListener('input', changeCreateNameValue);
  createColorInput.addEventListener('input', changeCreateColorValue);
  updateNameInput.addEventListener('input', changeUpdateNameValue);
  updateColorInput.addEventListener('input', changeUpdateColorValue);
}

export function renderPanel(selector: string): void {
  const root = document.getElementById(selector) as HTMLElement;

  const html = createPanel();
  root.insertAdjacentHTML('beforebegin', html);

  const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

  if (store.isRaceBtnActive) {
    addDisableToBtn(resetBtn, 'btn_disabled');
    removeDisableToBtn(raceBtn, 'btn_disabled');
  } else {
    addDisableToBtn(raceBtn, 'btn_disabled');
    removeDisableToBtn(resetBtn, 'btn_disabled');
  }

  addPanelListeners();
}
