import React, {
  AllHTMLAttributes,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "ui/Input/InputCore/index.module.css";
import { Control, Controller } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import cn from "classnames";
import NumberFormat from "react-number-format";

type InputConstructorType = {
  classNames?: {
    state?: {
      error?: string;
      locked?: string;
      loading?: string;
    };
    elements?: {
      wrapper?: string;
      input?: string;
      label?: string;
      support?: string;
      error?: string;
    };
  };
  icons: {
    lock?: FC<any>;
    eyeClosed: FC<any>;
    edit: FC<any>;
  };
};

export type TextInputPropsType = {
  mask?: string;
  support?: ReactNode | Array<ReactNode>;
  control: Control<any>;
  name: any;
  placeholder?: string;
  type?: string;
  isLoading?: boolean;
  value?: string;
  error?: string;
} & AllHTMLAttributes<HTMLInputElement>;

const InputSupports: FC<{
  builderProps: InputConstructorType;
  componentProps: TextInputPropsType;
}> = ({ componentProps, builderProps }) => {
  const { classNames, icons } = builderProps;
  return (
    <>
      {componentProps.placeholder && (
        <label className={cn(styles.label, classNames?.elements?.label)}>
          {componentProps.placeholder}
        </label>
      )}
      {(componentProps.support || componentProps.readOnly) && (
        <div className={cn(styles.support, classNames?.elements?.support)}>
          {componentProps.support
            ? componentProps.support
            : componentProps.readOnly && icons?.lock
            ? React.createElement(icons?.lock, {})
            : ""}
        </div>
      )}
      {Boolean(componentProps.error) && (
        <div
          title={cn(componentProps.error, classNames?.elements?.error)}
          className={styles.error}
        >
          {componentProps.error}
        </div>
      )}
    </>
  );
};

const InputWrapper: FC<{
  inputProps: TextInputPropsType;
  builderProps: InputConstructorType;
}> = (props) => {
  const { builderProps, inputProps } = props;
  return (
    <div
      className={cn(
        styles.wrapper,
        inputProps.className,
        {
          [styles["wrapper-error"]]: inputProps.error,
          [builderProps.classNames?.state?.error || ""]: inputProps.error,
          /**/
          [styles["wrapper--lock"]]: inputProps.readOnly,
          [builderProps.classNames?.state?.locked || ""]: inputProps.readOnly,
        },
        builderProps.classNames?.elements?.wrapper
      )}
    >
      {props.children}
    </div>
  );
};

export function InputTextBuilder(builderProps: InputConstructorType) {
  const { classNames, icons } = builderProps;
  const Input = function InputText(props: TextInputPropsType) {
    return (
      <InputWrapper builderProps={builderProps} inputProps={props}>
        <Controller
          control={props.control}
          name={props.name}
          defaultValue={props.defaultValue}
          render={({ field }) => (
            <ReactInputMask
              data-class="input"
              autoComplete="off"
              //@ts-ignore
              maskChar={null}
              mask={props.mask || ""}
              {...props}
              {...field}
              className={cn(styles.input, classNames?.elements?.input, {
                [styles.input_readonly]: props.readOnly,
              })}
              inputRef={field.ref}
              readOnly={props.readOnly}
              onChange={(e) => {
                field.onChange(e);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
            />
          )}
        />
        <InputSupports componentProps={props} builderProps={builderProps} />
      </InputWrapper>
    );
  };

  return {
    Default: Input,
    Password: (props: TextInputPropsType) => {
      const [isOpen, setIsOpen] = useState(false);
      const icon = icons.eyeClosed;

      return (
        <Input
          {...props}
          type={isOpen ? "text" : "password"}
          support={React.createElement(icon, {
            onClick: () => setIsOpen(!isOpen),
            style: { cursor: "pointer" },
          })}
        />
      );
    },

    Editable: (props: TextInputPropsType) => {
      const [isEdit, setIsEdit] = useState(false);
      const icon = icons.edit;

      return (
        <Input
          {...props}
          disabled={!isEdit}
          support={React.createElement(icon, {
            onClick: () => setIsEdit(!isEdit),
            style: { cursor: "pointer" },
          })}
        />
      );
    },
    CalendarInput: (props: any) => {
      return (
        <InputWrapper builderProps={builderProps} inputProps={props}>
          <ReactInputMask
            className={cn(styles.input, classNames?.elements?.input)}
            mask={"99.99.9999"}
          />
          <InputSupports componentProps={props} builderProps={builderProps} />
        </InputWrapper>
      );
    },
    Numeric: (props: TextInputPropsType) => {
      return (
        <InputWrapper builderProps={builderProps} inputProps={props}>
          <Controller
            control={props.control}
            name={props.name}
            render={({ field }) => (
              <NumberFormat
                {...field}
                placeholder={"0"}
                className={cn(styles.input, classNames?.elements?.input)}
                allowNegative={false}
                thousandSeparator={" "}
              />
            )}
          />
          <InputSupports componentProps={props} builderProps={builderProps} />
        </InputWrapper>
      );
    },
  };
}
