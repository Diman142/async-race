import { CarProprs } from '../helpers/interfaces';
import { store, saveCarState } from '../helpers/store';
import { deleteCar, startEngine, drive, stopEngine, deleteWinner } from '../helpers/api';
import { getDistance, animate, addDisableToBtn, removeDisableToBtn } from '../helpers/utils';

export function createCarImage(color: string): string {
  return `
  <svg id="Capa_1" enable-background="new 0 0 447.906 447.906" height="100" viewBox="0 0 447.906 447.906" width="100" xmlns="http://www.w3.org/2000/svg"><g><path d="m44.142 252.115 15.21 15.151 76.892 6.584s19.756-5.322 19.949-6.623-8.755-49.949-11.09-51.715-56.997-7.588-58.367-7.588-30.539 9.146-30.539 9.146z" fill="#2f4859"/><path d="m317.242 262.597 32.587 11.238h75.25l17.727-20.25-17.915-34.942-51.042-6.786-30.559 11.431z" fill="#2f4859"/><circle cx="387.278" cy="263.967" fill="#3a556a" r="33.997"/><path d="m379.73 237.528c-9.19 2.525-16.371 9.705-18.895 18.895-4.161 14.596 4.299 29.802 18.895 33.963s29.802-4.299 33.963-18.895-4.299-29.802-18.895-33.963c-4.925-1.403-10.143-1.403-15.068 0zm10.783 5.773c.001-1.639 1.331-2.967 2.97-2.965.289 0 .576.043.853.126 7.919 2.351 14.115 8.544 16.471 16.462.47 1.57-.422 3.224-1.992 3.694-.278.083-.567.125-.857.125h-12.722c-.876-2.144-2.579-3.845-4.724-4.719v-12.723zm-6.465 41.332c.004 1.639-1.321 2.971-2.961 2.975-.292.001-.583-.042-.863-.126-7.891-2.384-14.065-8.56-16.447-16.452-.47-1.57.422-3.224 1.992-3.694.276-.083.563-.125.852-.125h12.702c.876 2.144 2.579 3.845 4.724 4.719v12.703zm0-28.61c-2.145.874-3.848 2.575-4.724 4.719h-12.722c-1.639-.005-2.964-1.338-2.959-2.977.001-.285.043-.569.125-.842 2.348-7.93 8.557-14.128 16.491-16.462 1.571-.467 3.223.428 3.691 1.999.081.273.123.556.123.84zm1.86 31.588h2.76m22.14-16.581c-2.382 7.892-8.556 14.067-16.447 16.452-1.569.473-3.225-.417-3.698-1.986-.084-.28-.127-.571-.126-.863v-12.702c2.145-.874 3.848-2.575 4.724-4.719h12.697c1.639.01 2.959 1.348 2.949 2.987-.002.282-.044.562-.125.832zm.371-5.693v-2.74" fill="#e1e6e9"/><circle cx="97.691" cy="263.967" fill="#3a556a" r="33.997"/><path d="m90.143 237.528c-9.19 2.525-16.371 9.705-18.895 18.895-4.161 14.596 4.299 29.802 18.895 33.963s29.802-4.299 33.963-18.895-4.299-29.802-18.895-33.963c-4.924-1.403-10.143-1.403-15.068 0zm10.783 5.773c.001-1.639 1.331-2.967 2.97-2.965.289 0 .576.043.853.126 7.92 2.35 14.117 8.543 16.472 16.462.47 1.57-.422 3.224-1.992 3.694-.278.083-.567.125-.857.125h-12.722c-.876-2.144-2.579-3.845-4.724-4.719zm-6.465 41.332c.004 1.639-1.321 2.971-2.961 2.975-.292.001-.583-.042-.863-.126-7.891-2.384-14.065-8.56-16.447-16.452-.47-1.57.422-3.224 1.992-3.694.276-.083.563-.125.852-.125h12.702c.876 2.144 2.579 3.845 4.724 4.719zm0-28.61c-2.145.874-3.848 2.575-4.724 4.719h-12.722c-1.639-.005-2.964-1.338-2.959-2.977.001-.285.043-.569.125-.842 2.343-7.924 8.542-14.121 16.467-16.462 1.571-.467 3.223.428 3.691 1.999.081.273.123.556.123.84zm26.736 15.007c-2.383 7.893-8.559 14.069-16.452 16.452-1.569.473-3.225-.417-3.698-1.986-.084-.28-.127-.571-.126-.863v-12.702c2.145-.874 3.848-2.575 4.724-4.719h12.702c1.639-.003 2.97 1.323 2.974 2.962.001.29-.041.579-.124.856z" fill="#e1e6e9"/><path d="m424.841 207.415c-23.07-9.368-76.175-17.06-97.8-13.934 0 0-43.256-37.969-91.315-42.044-32.121-2.057-64.343-1.99-96.455.203-9.307.56-18.477 2.513-27.205 5.792-16.002 6.015-43.786 16.704-65.203 26.216l-27.566 1.157c-3.896.154-7.072 3.175-7.42 7.059l-11.871 36s2.162 26.191 5.768 32.676l53.579 6.712s-4.071-47.105 39.408-44.32 37.484 50.923 37.484 50.923h213.585s-3.383-27.903 16.452-42.49c14.409-10.515 34.218-9.482 47.456 2.473 8.137 7.42 14.612 19.786 11.342 40.031l21.868-5.866.96-34.625c-.002.001-.002-16.59-23.067-25.963z" fill="${color}"/><path d="m192.959 155.517v34.59l-103.612-4.872s22.397-27.645 86.404-29.678c3.605-.099 10.184-.099 17.208-.04z" fill="#3a556a"/><path d="m317.237 195.964-117.789-5.535v-34.823c7.024.109 13.697.272 17.51.44 36.941 1.763 72.234 15.812 100.279 39.918z" fill="#3a556a"/><g fill="#e1e6e9"><path d="m444.894 227.735c-2.735-8.132-14.152-18.613-16.288-12.796 0 0-3.215 10.387 10.387 20.508 1.878 1.393 4.53 1 5.923-.878.537-.724.829-1.6.834-2.501-.067-1.479-.355-2.94-.856-4.333z"/><path d="m11.886 191.844 14.221 2.547-11.218 32.795-14.889.657z"/></g></g></svg>
`;
}

export function createCar(props: CarProprs): string {
  return `
    <div class="car" id="${props.id}">
      <div class="car-btns">
        <button class="car__button car__button_select"
        id="select-car-${props.id}">Select</button>
        <button class="car__button car__button_remove"
        id="remove-car-${props.id}">Remove</button>
        <span class="car__name">${props.name}</span>
      </div>
      <div class="road">
        <div class="road-btns">
          <button class="road__btn road__btn_start
          ${props.isEngineStarted ? 'btn_disabled' : ''}"
          id="start-car-${props.id}"
          ${props.isEngineStarted ? 'disabled' : ''}></button>
          <button class="road__btn road__btn_stop
          ${!props.isEngineStarted ? 'btn_disabled' : ''}"
          id="stop-car-${props.id}"
          ${!props.isEngineStarted ? 'disabled' : ''}"
          ></button>
        </div>
        <div class="car__item" id="car=${props.id}">
          <div class="car-icon" id="car-icon-${props.id}"
          style="transform: ${props.translateX};">
          ${createCarImage(props.color)}
          </div>
          <div class="road__flag" id="flag-${props.id}"></div>
        </div>
      </div>
    </div>
  `;
}

export function selectBtnHandler(e: Event): void {
  const target = e.target as HTMLElement;
  const updateNameInput = document.getElementById('updateName') as HTMLInputElement;
  const updateColorInput = document.getElementById('updateColor') as HTMLInputElement;

  const { id } = target.closest('.car') as HTMLElement;

  const updCar = store.cars.find(car => {
    if (car.id?.toString() === id.toString()) return true;
    return false;
  });
  if (updCar) {
    updateNameInput.value = updCar.name;
    updateColorInput.value = updCar.color;
    store.updateInputNameValue = updCar.name;
    store.updatingCar = updCar;
  }
}

export async function startCarHandler(e: Event): Promise<void> {
  const target = e.target as HTMLButtonElement;
  const startCarNode = target.closest('.car') as HTMLElement;
  const finishflag = startCarNode.querySelector('.road__flag') as HTMLElement;
  const startcarIcon = startCarNode.querySelector('.car-icon') as HTMLElement;
  const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  const stoptBtn = startCarNode.querySelector('.road__btn_stop') as HTMLButtonElement;

  if (stoptBtn) removeDisableToBtn(stoptBtn, 'btn_disabled');
  addDisableToBtn(target, 'btn_disabled');
  addDisableToBtn(raceBtn, 'btn_disabled');
  removeDisableToBtn(resetBtn, 'btn_disabled');
  store.isRaceBtnActive = false;

  if (startCarNode) {
    const { id } = startCarNode;
    const distance = getDistance(startcarIcon, finishflag);
    const res = await startEngine(id);
    const animationDuration = res.distance / res.velocity;

    animate(startcarIcon, distance, animationDuration, '', +id);

    store.cars.forEach(car => {
      if (car.id?.toString() === id) car.isEngineStarted = true;
    });

    try {
      await drive(id);
    } catch (err) {
      const animationObj = store.animation.find(item => {
        if (item.id === startcarIcon.id) return true;
        return false;
      });
      if (animationObj) cancelAnimationFrame(animationObj?.frameId);
      saveCarState({ id: +id, isEngineStarted: true, transtaleX: startcarIcon.style.transform });
    }
  }
}

function resetCarInStore(id: string) {
  store.cars.forEach(car => {
    if (car.id?.toString() === id) {
      car.isEngineStarted = false;
      car.translateX = `translateX(0px)`;
    }
  });

  store.carsState.forEach(car => {
    if (car.id?.toString() === id) {
      car.isEngineStarted = false;
      car.transtaleX = `translateX(0px)`;
    }
  });
}

export async function stoptBtnHandler(e: Event): Promise<void> {
  const target = e.target as HTMLButtonElement;
  let raceBtnDisFlag = false;
  const stopCarNode = target.closest('.car') as HTMLElement;
  const startBtn = stopCarNode.querySelector('.road__btn_start') as HTMLButtonElement;
  const stopCarIcon = stopCarNode.querySelector('.car-icon') as HTMLElement;
  const raceBtn = document.getElementById('raceBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

  if (stopCarNode) {
    const { id } = stopCarNode;
    store.animation.forEach(item => {
      if (item.id === stopCarIcon.id) cancelAnimationFrame(item.frameId);
    });

    saveCarState({ id: +id, isEngineStarted: false });
    stopCarIcon.style.transform = `translateX(0px)`;
    await stopEngine(id);
    addDisableToBtn(target, 'btn_disabled');

    if (startBtn) removeDisableToBtn(startBtn, 'btn_disabled');
    resetCarInStore(id);

    store.cars.forEach(item => {
      if (item.isEngineStarted) raceBtnDisFlag = raceBtnDisFlag || item.isEngineStarted;
    });
    if (!raceBtnDisFlag && !store.isRaceStarted) {
      removeDisableToBtn(raceBtn, 'btn_disabled');
      addDisableToBtn(resetBtn, 'btn_disabled');
      store.isRaceBtnActive = true;
    }
  }
}

export async function removeBtnHandler(e: Event): Promise<void> {
  const target = e.target as HTMLElement;
  const deleteCarNode = target.closest('.car') as HTMLElement;

  if (deleteCarNode) {
    const { id } = deleteCarNode;
    try {
      await deleteCar(id);
      await deleteWinner(id);
      deleteCarNode.remove();

      store.cars = store.cars.filter(car => {
        if (`${car.id}` !== id) return true;
        return false;
      });

      store.carsCount = (+store.carsCount - 1).toString();
      const mainTitle = document.querySelector('.main__title') as HTMLElement;

      if (mainTitle) mainTitle.textContent = `Garage (${store.carsCount})`;
    } catch (err) {
      throw Error(err);
    }
  }
}

function addCarListeners(): void {
  const selectBtns = document.querySelectorAll('.car__button_select');
  const removetBtns = document.querySelectorAll('.car__button_remove');
  const startBtns = document.querySelectorAll('.road__btn_start');
  const stopBtns = document.querySelectorAll('.road__btn_stop');

  selectBtns.forEach(selectBtn => {
    selectBtn.addEventListener('click', selectBtnHandler);
  });

  removetBtns.forEach(removeBtn => {
    removeBtn.addEventListener('click', removeBtnHandler);
  });

  startBtns.forEach(startBtn => {
    startBtn.addEventListener('click', startCarHandler);
  });

  stopBtns.forEach(startBtn => {
    startBtn.addEventListener('click', stoptBtnHandler);
  });
}

export function renderGarage(carsArr: CarProprs[], selector: string): void {
  const root = document.getElementById(selector) as HTMLElement;
  const title = `<h1 class="main__title">Garage (${store.carsCount})</h1>`;
  const pageTitle = `<h3 class="main__page">Page #${store.page}</h3>`;
  root.innerHTML = '';

  const cars = carsArr
    .map((carConfig: CarProprs) => {
      return createCar(carConfig);
    })
    .join(' ');

  root.insertAdjacentHTML('afterbegin', title);
  root.insertAdjacentHTML('beforeend', pageTitle);
  root.insertAdjacentHTML('beforeend', cars);

  addCarListeners();
}

export function addToGarageCar(car: CarProprs, count: string): void {
  const garage = document.getElementById('garage') as HTMLElement;
  const cars = document.querySelectorAll('.car');
  const mainTitle = document.querySelector('.main__title') as HTMLElement;

  mainTitle.textContent = `Garage (${count})`;
  const newCar = createCar(car);

  if (cars.length < 7) {
    garage.insertAdjacentHTML('beforeend', newCar);
    const newCarSelectBtn = document.getElementById(`select-car-${car.id}`) as HTMLButtonElement;
    const newCarRemoveBtn = document.getElementById(`remove-car-${car.id}`) as HTMLButtonElement;
    const newCarStarttBtn = document.getElementById(`start-car-${car.id}`) as HTMLButtonElement;
    const newCarStopBtn = document.getElementById(`stop-car-${car.id}`) as HTMLButtonElement;

    newCarRemoveBtn?.addEventListener('click', removeBtnHandler);
    newCarSelectBtn?.addEventListener('click', selectBtnHandler);
    newCarStarttBtn?.addEventListener('click', startCarHandler);
    newCarStopBtn?.addEventListener('click', stoptBtnHandler);
  }
}
