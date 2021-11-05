export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const formatWeekDay = (formattedDate: string) => {
  switch (formattedDate) {
    case "понедельник":
      return "Пн";
    case "вторник":
      return "Вт";
    case "среда":
      return "Ср";
    case "четверг":
      return "Чт";
    case "пятница":
      return "Пт";
    case "суббота":
      return "Сб";
    case "воскресенье":
      return "Вс";
  }
};

export const renderDayContents = (dayOfMonth: number) => {
  if (dayOfMonth < 10) {
    return "0" + dayOfMonth;
  }
  return dayOfMonth;
};

export function zero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function dateFormat(month: number, day: number, year: number): string {
  return `${zero(month + 1)}-${zero(day)}-${year}`;
}

export const prepareDateForServer = (date: string) => {
  const splitedDate = date.split("-");
  return `${splitedDate[2]}-${splitedDate[0]}-${splitedDate[1]}T00:00:00+03:00`;
};
