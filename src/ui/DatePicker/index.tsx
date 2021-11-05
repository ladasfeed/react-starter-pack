import React from "react";
import { CalendarConstructor } from "ui/Core/CalendarCore";
import { InputText } from "ui/Input/InputText";

type propsType = {};
export const Calendar = CalendarConstructor({
  Input: InputText.CalendarInput,
});
