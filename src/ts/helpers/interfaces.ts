export interface BtnItemProps {
  id: string;
  btnClasses: Array<string>;
  label: string;
  clickHandler(e: MouseEvent): void;
  disabled?: boolean;
}

export interface NavItemProps {
  liStyles: string;
  aStyles: Array<string>;
  alabel: string;
  href: string;
}

export interface CarProprs {
  color: string;
  name: string;
  id?: string;
  isEngineStarted?: boolean;
  translateX?: string;
}

export interface CarAnimation {
  id: string;
  frameId: number;
}

export interface WinnerProps {
  id: number;
  time: number | string;
  wins: number;
}

export interface SpredConfigProps {
  name: string;
  id: number;
  time: number;
  color: string;
  wins: number;
}

export interface CarState {
  id: number;
  transtaleX?: string;
  isEngineStarted?: boolean;
}

export interface StoreInterface {
  cars: Array<CarProprs>;
  carsCount: string;
  updatingCar: CarProprs | null;
  page: number;
  animation: Array<CarAnimation>;
  winners: Array<WinnerProps>;
  winnersPage: number;
  winnersCount: number;
  winnersOrder: string;
  winnersSort: string;
  isFinished: boolean;
  isRaceStarted: boolean;
  carsState: Array<CarState>;
  createInputNameValue: string;
  createInputColorValue: string;
  updateInputNameValue: string;
  updateInputColorValue: string;
  isRaceBtnActive: boolean;
}

export interface GetReturnedType {
  items: Promise<Response>;
  count: string | null;
}
