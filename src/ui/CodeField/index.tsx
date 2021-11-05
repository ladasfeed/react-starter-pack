import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./index.module.css";
import { Control, UseFormSetValue } from "react-hook-form";
import { useCodeFieldLogic } from "ui/CodeField/useCodeFieldLogic";
var timeoutId = 0;

export type propsType = {
  setValue: UseFormSetValue<any>;
  name: string;
  length?: number;
  className?: string;
  placeholder?: string;
  error?: string;
  timeout?: number;
  timerCallback?(): void;
  sendCodeHandler?(): void;
};

export const CodeField: React.FC<propsType> = (props) => {
  const {
    error,
    className,
    length = 4,
    placeholder,
    sendCodeHandler,
    timeout = 60,
    setValue,
    name,
  } = props;

  const {
    fieldsArray,
    tempInput,
    arrayOfInputs,
    keyPressHandler,
    onClickHandler,
    onFocusHandler,
    pasteHandler,
  } = useCodeFieldLogic({
    codeLength: length,
    onChange: (val) => {
      setValue(name, val);
    },
  });

  /* state */
  const [timer, setTimer] = useState(timeout);
  const [sendCodeCounter, setSendCodeCounter] = useState(0);
  /* methods */
  function createTimer() {
    window.clearInterval(timeoutId);
    timeoutId = window.setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    setTimer((timer) => {
      if (timer <= 0) {
        window.clearInterval(timeoutId);
        return 0;
      } else {
        return timer - 1;
      }
    });
  }
  /* effects */
  useEffect(() => {
    timeoutId = window.setInterval(updateTimer, 1000);
  }, []);

  return (
    <div
      className={cn(styles.wrapper, className, {
        [styles["wrapper--error"]]: Boolean(error),
      })}
    >
      <div className={styles.fields}>
        {fieldsArray.map((_, index) => {
          const disabled = tempInput != index && !fieldsArray[index];

          function handlerRef(el: any) {
            arrayOfInputs.current[index] = el;
          }

          function handlerClick(event: React.MouseEvent<HTMLInputElement>) {
            onClickHandler(event, index);
          }

          return (
            <div className={styles.input_wrapper}>
              <input
                className={cn(styles.input, {
                  [styles["input--error"]]: error,
                })}
                type="tel"
                key={index}
                maxLength={1}
                id={`${index}-id`}
                data-cy={`field-${index}`}
                placeholder={placeholder}
                value={fieldsArray[index]}
                disabled={disabled}
                ref={handlerRef}
                onKeyDown={keyPressHandler}
                onFocus={onFocusHandler}
                onClick={handlerClick}
                onPaste={pasteHandler}
              />
            </div>
          );
        })}
        {error && <div className={styles.error}>{error}</div>}
      </div>
      <div className={styles.timer}>
        {timer >= -1 && (
          <>
            <span className={styles.timer__inner}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (timer == 0 && sendCodeCounter < 5) {
                    setTimer(60);
                    setSendCodeCounter(sendCodeCounter + 1);
                    createTimer();
                  }
                }}
                className={styles.text_wrapper}
              >
                <div className={styles.repeat}>
                  {timer > 0 ? (
                    "Запросить код еще раз через " +
                    (timer >= 60
                      ? "01:" + (Math.floor(timer) - 60 + "0")
                      : "00:" +
                        (timer >= 10
                          ? Math.floor(timer)
                          : "0" + Math.floor(timer)))
                  ) : (
                    <>
                      <p onClick={sendCodeHandler}>Повторно отправить код</p>
                      <p>{sendCodeCounter} / 5</p>
                    </>
                  )}
                </div>
              </div>
            </span>
            <div
              className={styles.line}
              style={{
                minWidth: "50px",
                width:
                  timer > 0
                    ? `${((61 - Math.ceil(timer * 100) / 100) / 60) * 100}%`
                    : "50px",
                transition: "0.1s",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
