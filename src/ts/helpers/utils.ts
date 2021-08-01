import { store, saveCarState } from './store';
import { saveWinner } from './api';

function getPosition(elem: HTMLElement): number {
  const { left, width } = elem.getBoundingClientRect();

  return left + width / 2;
}

export function getDistance(a: HTMLElement, b: HTMLElement): number {
  const xPosA = getPosition(a);
  const xPosB = getPosition(b);

  return xPosB - xPosA;
}

async function finishRace(name: string, time: number, id: number) {
  const finishStr = document.createElement('p');
  finishStr.classList.add('finish');
  finishStr.id = 'finish';
  finishStr.textContent = `${name} went first [${time}sec]`;

  document.body.insertAdjacentElement('beforeend', finishStr);

  await saveWinner(id, time);

  setTimeout(() => {
    finishStr.remove();
  }, 5000);
}

export function animate(
  car: HTMLElement,
  distance: number,
  animationDuration: number,
  carName?: string,
  dbId?: number,
): void {
  const start = performance.now();
  const speed = distance / animationDuration;

  requestAnimationFrame(function anim(timeStamp) {
    let flag = false;
    const currTime = timeStamp - start;
    const progress = Math.round(currTime * speed);

    car.style.transform = `translateX(${progress}px)`;

    if (progress < distance) {
      const frameId = requestAnimationFrame(anim);
      if (store.animation.length) {
        store.animation.forEach(item => {
          if (item.id.toString() === car.id.toString()) {
            item.frameId = frameId;
            flag = true;
          }
        });

        if (!flag) store.animation.push({ id: car.id, frameId });
      } else {
        store.animation.push({ id: car.id, frameId });
      }
    } else {
      if (dbId) saveCarState({ id: dbId, transtaleX: car.style.transform, isEngineStarted: true });
      if (!store.isFinished && store.isRaceStarted) {
        const roundedTime = Math.trunc(currTime / 10) / 100;
        if (carName && dbId) finishRace(carName, roundedTime, dbId);
        store.isRaceStarted = false;
        store.isFinished = true;
      }
    }
  });
}

export function addDisableToBtn(btn: HTMLButtonElement, disClass: string): void {
  btn.classList.add(disClass);
  btn.setAttribute('disabled', 'true');
}

export function removeDisableToBtn(btn: HTMLButtonElement, disClass: string): void {
  btn.classList.remove(disClass);
  btn.removeAttribute('disabled');
}

const marks: Array<string> = [
  'Tesla',
  'Daewoo',
  'Audi',
  'Opel',
  'Lada',
  'Bentley',
  'Toyota',
  'BMW',
  'Mercedes',
  'Citroien',
  'Moskvich',
  'Fiat',
  'UAZ',
  'Reno',
  'Nissan',
  'Ford',
  'Chevrolet',
  'Jeep',
  'KIA',
  'Hynday',
  'Zonda',
];

const models = [
  'Model S',
  'Nexia',
  'A6',
  'Astra',
  'Vesta',
  'Bentaigo',
  'Camry',
  'X5',
  'CLK',
  'C5',
  '412',
  '500',
  'Patriot',
  'Logan',
  'Mondeo',
  'Cruz',
  'Commandor',
  'Rio',
  'Solaris',
  'R',
];

export function getRandomName(): string {
  const mark = marks[Math.floor(Math.random() * marks.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${mark} ${model}`;
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];

  return color;
}
