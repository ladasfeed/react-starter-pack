import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styles from "ui/Core/Switch/index.module.css";
import { createComponent } from "ui/Core/ErrorFallback";
import { Control } from "react-hook-form";

type SwitchBuilderType = {
  classNames: {
    container?: string;
    input?: string;
  };
};

type propsType = {
  name: string;
  control: Control<any>;
} & HTMLAttributes<HTMLDivElement>;

export const SwitchBuilder = (builderProps: SwitchBuilderType) => {
  const Switch = createComponent("Switch", (props: propsType) => {
    return (
      <label className={styles.container}>
        <input
          type="checkbox"
          {...props.control.register(props.name)}
          className={styles.input}
        />
        <div className={styles.switch_container}>
          <div className={styles.switch_circle} />
        </div>
      </label>
    );
  });

  return {
    default: Switch,
  };
};
