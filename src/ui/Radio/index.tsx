import React, { FC, useEffect, useState } from "react";
import styles from "./index.module.css";
import { createComponent } from "ui/ErrorFallback";

type propsType = {};
export const Radio = createComponent("Radio", (props: FC<{}>) => {
  return <div className={styles.container}></div>;
});
