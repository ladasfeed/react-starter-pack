import React, { FC, useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import cn from "classnames";
import DatePicker from "react-datepicker";
import styles from "./style.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import { CalendarHeader } from "ui/DatePicker/CalendarCore/Bricks/CalendarHeader";
import {
  formatWeekDay,
  renderDayContents,
} from "ui/DatePicker/CalendarCore/helpers";

type propsType = {
  control: Control<any>;
  name: string;
  big?: boolean;
  highlightDates?: any[];
  placeholder?: string;
  rightCalendar?: boolean;
  className?: string;
  error?: string;
  style?: any;
  defaultValue?: Date;
};

type constructorType = {
  Input: FC<any>;
};

export const CalendarConstructor = (constructor: constructorType) => {
  const Calendar: FC<propsType> = ({
    control,
    name,
    big,
    highlightDates,
    placeholder = "Дата",
    rightCalendar = false,
    className,
    error,
    style,
    defaultValue,
  }) => {
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
      setDidMount(true);
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    return (
      <div
        className={cn({
          [styles.container]: true,
          [`${className}`]: className,
          big: big,
        })}
        style={style}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <DatePicker
                // locale={ru}
                formatWeekDay={formatWeekDay}
                inline={big}
                popperClassName={cn({
                  [styles.right]: rightCalendar,
                })}
                open={isOpen}
                selected={field.value}
                highlightDates={highlightDates}
                renderDayContents={renderDayContents}
                renderCustomHeader={(props) => (
                  <CalendarHeader big={big} {...props} />
                )}
                onChange={(date) => {
                  field.onChange(date);
                  close();
                }}
                onBlur={close}
                dateFormat="dd.MM.yyyy"
                placeholderText={placeholder}
                //@ts-ignore
                customInputRef={field.ref}
                name={field.name}
                value={field.value}
                customInput={React.createElement(constructor.Input, {
                  // support={
                  //   <Icons.ui.dateIcon
                  //     className={styles.icon}
                  //     onClick={() => setIsOpen(!isOpen)}
                  //   />
                  // }
                  className: styles.input,
                  placeholder: placeholder,
                  label: placeholder,
                  error: error,
                })}
              />
            );
          }}
        />
      </div>
    );
  };

  return Calendar;
};
