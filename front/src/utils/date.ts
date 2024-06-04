function getDateWithSeparator(
  dateString: Date | string,
  separator: string = '',
) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  console.log(year, month, day);
  return [
    String(year),
    String(month).padStart(2, '0'),
    String(day).padStart(2, '0'),
  ].join(separator);
}

export {getDateWithSeparator};
