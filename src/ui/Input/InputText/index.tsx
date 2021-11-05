import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import { InputTextBuilder } from "ui/Input/InputCore";
import { ReactComponent as EditIcon } from "ui/Input/assets/Edit.svg";
import { ReactComponent as EyeClosed } from "ui/Input/assets/EyeClosed.svg";
import { ReactComponent as Lock } from "ui/Input/assets/Lock.svg";

type propsType = {};
export const InputText = InputTextBuilder({
  classNames: {
    elements: {
      input: styles.input,
      wrapper: styles.wrapper,
      label: styles.label,
    },
  },
  icons: {
    lock: Lock,
    eyeClosed: EyeClosed,
    edit: EditIcon,
  },
});

export const InputTest = InputTextBuilder({
  classNames: {
    elements: {
      input: styles.input,
      wrapper: styles.wrapper,
      label: styles.label,
    },
  },
  icons: {
    lock: Lock,
    eyeClosed: EyeClosed,
    edit: EditIcon,
  },
});
