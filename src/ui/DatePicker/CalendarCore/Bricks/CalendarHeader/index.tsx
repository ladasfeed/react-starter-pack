import React, { FC, useEffect, useState } from "react";
import styles from "ui/DatePicker/CalendarCore/Bricks/CalendarHeader/style.module.css";
import cn from "classnames";
import moment from "moment";
import "moment/locale/ru";
import { months } from "ui/DatePicker/CalendarCore/helpers";

type propsType = {
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  customHeaderCount: number;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  decreaseYear(): void;
  increaseYear(): void;
  prevYearButtonDisabled: boolean;
  nextYearButtonDisabled: boolean;

  big?: boolean;
};

const years = (function () {
  const start = moment().get("year");
  const years: Array<number> = [];
  for (let i = start; i > start - 100; i--) {
    years.push(i);
  }
  return years;
})();

export const CalendarHeader: FC<propsType> = ({
  date,
  decreaseMonth,
  increaseMonth,
  changeYear,
  changeMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  big,
}) => {
  // const { t } = useTranslation();
  const [isVisibleSelectYear, setIsVisibleSelectYear] = useState(false);
  const [isVisibleSelectMonth, setIsVisibleSelectMonth] = useState(false);

  const toggleIsVisibleSelectYear = () => {
    setIsVisibleSelectYear(!isVisibleSelectYear);
    setIsVisibleSelectMonth(false);
  };

  const toggleIsVisibleSelectMonth = () => {
    setIsVisibleSelectMonth(!isVisibleSelectMonth);
    setIsVisibleSelectYear(false);
  };

  const hideAllPopup = () => {
    setIsVisibleSelectMonth(false);
    setIsVisibleSelectYear(false);
  };

  return (
    <header
      className={cn({
        [styles.header]: true,
        [styles.header_big]: big,
      })}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          isVisibleSelectYear || isVisibleSelectMonth
            ? hideAllPopup()
            : decreaseMonth();
        }}
        disabled={prevMonthButtonDisabled}
      >
        {/*{isVisibleSelectYear || isVisibleSelectMonth ? (*/}
        {/*  <Icons.ui.arrowAngleIcon className={styles.angle_arrow} />*/}
        {/*) : (*/}
        {/*  <Icons.ui.arrowIcon*/}
        {/*    className={styles.month_arrow}*/}
        {/*    style={{*/}
        {/*      transform: "rotateZ(180deg)",*/}
        {/*      paddingBottom: "3px",*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </button>
      <div
        className={cn({
          [styles.month_year]: true,
          [styles.month_year_big]: big,
        })}
      >
        <span
          onClick={toggleIsVisibleSelectMonth}
          className={cn({
            [styles.month]: true,
            [styles.month_big]: big,
          })}
        >
          {moment().month(date.getMonth()).format("MMMM")}
        </span>
        <span onClick={toggleIsVisibleSelectYear} className={styles.year}>
          {moment(date).get("year")}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          increaseMonth();
        }}
        disabled={nextMonthButtonDisabled}
        className={cn({
          [styles.next_month_button]:
            isVisibleSelectYear || isVisibleSelectMonth,
        })}
      >
        {/*<Icons.ui.arrowIcon*/}
        {/*  className={styles.month_arrow}*/}
        {/*  style={{*/}
        {/*    paddingTop: "3px",*/}
        {/*  }}*/}
        {/*/>*/}
      </button>
      <div
        // variants={calendarAnimation}
        // initial="close"
        // animate={isVisibleSelectYear ? "open" : "close"}
        className={cn({
          [styles.choice]: true,
          [styles.choice_big]: big,
        })}
      >
        {years.reverse().map((year) => (
          <p
            className={cn({
              [styles.current_year]: moment(date).get("year") == year,
            })}
            onClick={() => {
              changeYear(year);
              toggleIsVisibleSelectYear();
            }}
          >
            {year}
          </p>
        ))}
      </div>
      <div
        // variants={calendarAnimation}
        // initial="close"
        // animate={isVisibleSelectMonth ? "open" : "close"}
        className={cn({
          [styles.choice]: true,
          [styles.choice_big]: big,
        })}
      >
        {months.map((month, index) => (
          <p
            className={cn({
              [styles.current_year]: months[moment(date).get("year")] === month,
            })}
            onClick={() => {
              changeMonth(months.indexOf(month));
              toggleIsVisibleSelectMonth();
            }}
          >
            {moment().month(index).format("MMMM")}
          </p>
        ))}
      </div>
    </header>
  );
};
