function getDateDetails(dateString: Date | string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {year, month, day};
}

function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  const {year, month, day} = getDateDetails(dateString);

  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

function getDateLocaleFormat(dateString: Date | string) {
  const {year, month, day} = getDateDetails(dateString);

  return `${year}년 ${month}월 ${day}일`;
}

function getMonthYearDetails(initialDate: Date) {
  const month = initialDate.getMonth() + 1;
  const year = initialDate.getFullYear();
  const startDate = new Date(`${year}-${month}`);
  const firstDOW = startDate.getDay(); // 매달 1일이 무슨 요일인지 알 수 있음
  const lastDateString = String(new Date(year, month, 0).getDate()); // 마지막 날짜 알 수 있음
  const lastDate = Number(lastDateString);

  return {month, year, startDate, firstDOW, lastDate};
}

type MonthYear = {
  month: number;
  year: number;
  startDate: Date;
  firstDOW: number;
  lastDate: number;
};

function getNewMonthYear(prevData: MonthYear, increment: number) {
  const newMonthYear = new Date(
    prevData.startDate.setMonth(prevData.startDate.getMonth() + increment),
  );

  return getMonthYearDetails(newMonthYear);
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;

  return currentDate === inputDate;
}

export {
  getDateWithSeparator,
  getDateLocaleFormat,
  getMonthYearDetails,
  getNewMonthYear,
  isSameAsCurrentDate,
};

export type {MonthYear};
