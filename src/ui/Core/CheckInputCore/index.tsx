import React, { FC, HTMLAttributes } from "react";
import styles from "ui/Core/CheckInputCore/index.module.css";
import { createComponent } from "ui/Core/ErrorFallback";
import { Control } from "react-hook-form";
import cn from "classnames";

type CheckboxCreatorType<T> = {
  classNames: {
    input?: string;
  };
  icons: {
    checkbox: {
      checked: FC<any>;
      unchecked: FC<any>;
    };
    radio: {
      checked: FC<any>;
      unchecked: FC<any>;
    };
  };
  customElement?: {
    component: FC<T>;
  };
};

type CheckBoxBaseType = {
  control: Control<any>;
  inputType: "checkbox" | "radio";
  name: string;
};

type CheckBoxType<T> = {
  label?: string;
  customPayload?: T;
} & HTMLAttributes<HTMLInputElement> &
  CheckBoxBaseType;

type CheckBoxGroupType<T> = {
  options: Array<{
    value: string;
    customPayload?: T;
  }>;
} & CheckBoxBaseType;

export function CheckInputCreator<T>(constructor: CheckboxCreatorType<T>) {
  const CheckBox = createComponent("Checkbox", (props: CheckBoxType<T>) => {
    return (
      <label className={cn(styles.container, props.className)}>
        <input
          type={props.inputType}
          className={cn(styles.checkbox_input, constructor.classNames.input)}
          {...props.control.register(props.name)}
        />
        {constructor.customElement ? (
          // @ts-ignore
          React.createElement(constructor.customElement.component, {
            ...props.customPayload,
          })
        ) : (
          <div className={styles.icon}>
            {React.createElement(constructor.icons[props.inputType].checked, {
              className: cn(styles.checked_icon),
            })}
            {React.createElement(constructor.icons[props.inputType].unchecked, {
              className: cn(styles.unchecked_icon),
            })}
          </div>
        )}
        <span className={styles.label}>{props.label}</span>
      </label>
    );
  });

  const CheckBoxGroup = createComponent(
    "CheckBoxGroup",
    (props: CheckBoxGroupType<T>) => {
      return (
        <div className={styles.group}>
          {props.options.map((item, index) => {
            return (
              <CheckBox
                inputType={props.inputType}
                control={props.control}
                name={props.name}
                customPayload={item.customPayload}
              />
            );
          })}
        </div>
      );
    }
  );

  return {
    default: CheckBox,
    group: CheckBoxGroup,
  };
}
