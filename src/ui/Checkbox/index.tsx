import React, { FC, HTMLAttributes } from "react";
import styles from "./index.module.css";
import { createComponent } from "ui/ErrorFallback";
import { Control } from "react-hook-form";
import cn from "classnames";

type CheckboxCreatorType = {
  classNames: {
    input?: string;
  };
  icons: {
    checked: FC<any>;
    unchecked: FC<any>;
  };
  customElement?: {
    // Нужно будет описать правило .input:checked ~ .component {}
    component: FC<any>;
  };
};

type CheckBoxType = {
  control: Control<any>;
  label: string;
  name: string;
} & HTMLAttributes<HTMLInputElement>;

type CheckBoxGroupType = {};

export function CheckboxCreator(constructor: CheckboxCreatorType) {
  const CheckBox = createComponent("Checkbox", (props: CheckBoxType) => {
    return (
      <label className={cn(styles.container, props.className)}>
        <input
          type="checkbox"
          className={cn(styles.checkbox_input)}
          {...props.control.register(props.name)}
        />
        {constructor.customElement ? (
          React.createElement(constructor.customElement.component, {})
        ) : (
          <div className={styles.icon}>
            {React.createElement(constructor.icons.checked, {
              className: cn(styles.checked_icon),
            })}
            {React.createElement(constructor.icons.unchecked, {
              className: cn(styles.unchecked_icon),
            })}
          </div>
        )}
        <span>{props.label}</span>
      </label>
    );
  });

  const CheckBoxGroup = createComponent(
    "CheckBoxGroup",
    (props: CheckBoxGroupType) => {
      return <div></div>;
    }
  );

  return {
    CheckBox,
    CheckBoxGroup,
  };
}
