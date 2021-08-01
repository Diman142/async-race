import { WinnerProps, SpredConfigProps } from '../helpers/interfaces';
import { store } from '../helpers/store';
import { getCar, getWinners } from '../helpers/api';
import { createCarImage } from './Car';

async function getSpeadConfig(rowConfigs: Array<WinnerProps>) {
  const requests = [] as Array<Promise<Response>>;

  rowConfigs.forEach(item => {
    requests.push(getCar(item.id.toString()));
  });

  const carsDatas = await Promise.all(requests);

  const spredConfig = rowConfigs.map(item => {
    let obj = {};
    carsDatas.forEach(el => {
      if (el.id?.toString() === item.id.toString()) {
        obj = {
          name: el.name,
          color: el.color,
          id: item.id,
          wins: item.wins,
          time: item.time,
        };
        return obj;
      }
      return false;
    });

    return obj;
  });

  return spredConfig;
}

export async function createRow(): Promise<string> {
  const res = (await getWinners(
    store.winnersPage,
    10,
    store.winnersSort,
    store.winnersOrder,
  )) as unknown as Array<WinnerProps>;
  store.winners = res.items;
  if (store.winners.length) {
    try {
      const rowConfigs = (await getSpeadConfig(store.winners)) as unknown as Array<SpredConfigProps>;
      const rows = rowConfigs
        .map((row, index) => {
          return `
          <tr>
            <td>${index + 1 + (store.winnersPage - 1) * 10}</td>
            <td>
              <div class="car-icon" id="car-icon-${row.id}">
                ${createCarImage(row.color)}
              </div>
            </td>
            <td>${row.name}</td>
            <td>${row.wins}</td>
            <td>${row.time} seconds</td>
          </tr>
        `;
        })
        .join(' ');

      const tbody = `<tbody class="table-body">${rows}</tbody>`;

      return tbody;
    } catch (e) {
      throw Error(e);
    }
  }
  return '';
}
