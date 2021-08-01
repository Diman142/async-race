import { CarProprs, WinnerProps, GetReturnedType } from './interfaces';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export async function getCars(page: number, limit = 7): Promise<GetReturnedType> {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
}

export async function getCar(id: string): Promise<Response> {
  let res = await fetch(`${garage}/${id}`);

  res = await res.json();

  return res;
}

export async function postCar(body: CarProprs): Promise<CarProprs> {
  let res = await fetch(garage, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  res = await res.json();

  return { id: res.id, color: res.color, name: res.name };
}

export async function updateCar(id: string, body: CarProprs): Promise<CarProprs> {
  let res = await fetch(`${garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  res = await res.json();

  return res;
}

export async function deleteCar(id: string): Promise<void> {
  await fetch(`${garage}/${id}`, {
    method: 'DELETE',
  });
}

export async function startEngine(id: string): Promise<Response> {
  let res = await fetch(`${engine}?id=${id}&status=started`);

  res = await res.json();

  return res;
}

export async function stopEngine(id: string): Promise<Response> {
  let res = await fetch(`${engine}?id=${id}&status=stopped`);

  res = await res.json();

  return res;
}

export async function drive(id: string): Promise<Response> {
  let res = await fetch(`${engine}?id=${id}&status=drive`);

  res = await res.json();

  return res;
}

function getSortOrder(sort?: string, order?: string): string {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
}

export async function getWinners(
  page: number,
  limit = 10,
  sort?: string,
  order?: string,
): Promise<GetReturnedType> {
  const res = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);

  return {
    items: await res.json(),
    count: res.headers.get('X-Total-Count'),
  };
}

export async function getWinnerStatus(id: string | number): Promise<number> {
  const res = await fetch(`${winners}/${id}`);

  return res.status;
}

export async function getWinner(id: string | number): Promise<Response> {
  let res = await fetch(`${winners}/${id}`);

  res = await res.json();

  return res;
}

export async function createWinner(body: WinnerProps): Promise<Response> {
  let res = await fetch(winners, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  res = await res.json();

  return res;
}

export async function updateWinner(id: string | number, body: WinnerProps): Promise<Response> {
  let res = await fetch(`${winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  res = await res.json();

  return res;
}

export async function saveWinner(id: number, time: number): Promise<void> {
  const status = await getWinnerStatus(id);

  if (status === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
}

export async function deleteWinner(id: string): Promise<void> {
  await fetch(`${winners}/${id}`, {
    method: 'DELETE',
  });
}
