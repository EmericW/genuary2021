import startOfYear from 'date-fns/startOfYear/index.js';
import addDays from 'date-fns/addDays/index.js';
import getYear from 'date-fns/getYear/index.js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

(async () => {
  const API_ENDPOINT = 'https://api.sunrise-sunset.org/json';
  const LATITUDE = '51.2093';
  const LONGITUDE = '3.2247';

  async function getData(latitude, longitude, date) {
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const response = await fetch(
      `${API_ENDPOINT}?lat=${LATITUDE}&lng=${LONGITUDE}&date=${formattedDate}`,
    );
    const result = await response.json();

    return result?.results;
  }

  const today = new Date();
  const firstDayOfTheYear = startOfYear(today);
  let isSameYear = true;
  let currentDate = firstDayOfTheYear;
  let result = [];

  while (isSameYear) {
    console.log(currentDate);
    const data = await getData(1, 1, currentDate);

    const nextDate = addDays(currentDate, 1);
    isSameYear = getYear(currentDate) === getYear(nextDate);

    result = [
      ...result,
      {
        ...data,
        date: `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`,
      },
    ];
    currentDate = nextDate;
  }

  fs.writeFileSync(path.resolve(`./data.json`), JSON.stringify(result));
})();
