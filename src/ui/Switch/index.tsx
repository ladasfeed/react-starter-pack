import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styles from "./index.module.css";
import { createComponent } from "ui/ErrorFallback";
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

export const SwitchBuilder = () => {
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

export const Switch = SwitchBuilder();
