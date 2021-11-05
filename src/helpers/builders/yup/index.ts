import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type yupBuilderPropsType<T> = {
  text: {
    req: string;
    email: string;
    min: (val: number) => string;
    max: (val: number) => string;
  };
  customSchemas: T;
};
export function yupBuilder<T>(constructor: yupBuilderPropsType<T>) {
  const yupText = {
    req: constructor.text.req,
    email: constructor.text.email,
    min: constructor.text.min,
    max: constructor.text.max,
  };

  return {
    yup: yup,
    resolver: yupResolver,
    create: (shape: any) => yup.object().shape(shape),

    schemas: {
      required() {
        return yup.string().required(yupText.req).typeError(yupText.req);
      },

      email() {
        return yup.string().required(yupText.req).email(yupText.email);
      },

      min(val: number) {
        return yup.string().required(yupText.req).min(val, yupText.min(val));
      },

      ...constructor.customSchemas,
    },
  };
}

export const Schema = yupBuilder({
  text: {
    req: "Required",
    max: () => "",
    email: "Email",
    min: () => "",
  },
  customSchemas: {
    password: () => yup.string().required("Passfuck"),
  },
});
