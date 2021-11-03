import React from "react";
import { CalendarConstructor } from "ui/DatePicker/CalendarCore";
import { InputText } from "ui/Input/InputText";

type propsType = {};
export const Calendar = CalendarConstructor({
  Input: InputText.CalendarInput,
});
