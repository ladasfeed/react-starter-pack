import styles from "ui/Checkbox/CheckInputCore/index.module.css";
import { ReactComponent as CheckboxUnchecked } from "ui/Checkbox/CheckInputCore/assets/CheckBox_unchecked.svg";
import { ReactComponent as CheckboxChecked } from "ui/Checkbox/CheckInputCore/assets/CheckBox_checked.svg";
import { ReactComponent as RadioUnchecked } from "ui/Checkbox/CheckInputCore/assets/RadioUnchecked.svg";
import { ReactComponent as RadioChecked } from "ui/Checkbox/CheckInputCore/assets/RadioChecked.svg";
import React from "react";
import { CheckboxCreator } from "ui/Checkbox/CheckInputCore";

export const CheckInput = CheckboxCreator({
  customElement: {
    component: (props: { text: string }) => {
      return <div className={styles.custom}>{props.text}</div>;
    },
  },
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
