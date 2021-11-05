import styles from "ui/Core/CheckInputCore/index.module.css";
import { ReactComponent as CheckboxUnchecked } from "ui/Core/CheckInputCore/assets/CheckBox_unchecked.svg";
import { ReactComponent as CheckboxChecked } from "ui/Core/CheckInputCore/assets/CheckBox_checked.svg";
import { ReactComponent as RadioUnchecked } from "ui/Core/CheckInputCore/assets/RadioUnchecked.svg";
import { ReactComponent as RadioChecked } from "ui/Core/CheckInputCore/assets/RadioChecked.svg";
import React from "react";
import { CheckInputCreator } from "ui/Core/CheckInputCore";

export const CheckInput = CheckInputCreator({
  classNames: {
    input: styles.input_custom,
  },
  icons: {
    checkbox: {
      unchecked: CheckboxUnchecked,
      checked: CheckboxChecked,
    },
    radio: {
      unchecked: RadioUnchecked,
      checked: RadioChecked,
    },
  },
});
