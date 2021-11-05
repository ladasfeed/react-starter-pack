import React, { useEffect, useRef, useState } from "react";

const isNumber = (value: string) => {
   return (Number(value) > 0 && Number(value) <= 9) || value == "0";
};

type useCodeFieldType = {
   codeLength: number;
   onChange: (value: string) => void;
   defaultValue?: string;
};
export const useCodeFieldLogic = (props: useCodeFieldType) => {
   const { codeLength, onChange, defaultValue } = props;

   const [tempInput, setTempInput] = useState(0);
   const [counter, setCounter] = useState(0);
   const [fieldsArray, setFieldsArray] = useState<Array<string>>(
      defaultValue ? defaultValue.split("") : Array(codeLength).fill("")
   );
   const arrayOfInputs = useRef<Array<HTMLInputElement | null>>([]);

   /* methods */
   const pasteHandler = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value = e.clipboardData.getData("Text");
      const valueLength = value.length;
      const tempArray: Array<string> = fieldsArray;
      let isValid = true;

      for (let i = 0; i < valueLength && i < codeLength; i++) {
         tempArray[i] = value[i];
         if (!isNumber(value[i])) isValid = false;
      }
      const newIndex =
         valueLength < codeLength - 1 ? valueLength : codeLength - 1;

      if (isValid) {
         setTempInput(newIndex);
         setFieldsArray(tempArray.slice(0, codeLength));
      }
   };

   const setFieldsArraySetter = (newIndex: number, value: string) => {
      setFieldsArray(
         fieldsArray.map((item, index) => {
            return index == newIndex ? value : item;
         })
      );
   };
   const keyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const eventType = {
         delete: event.key == "Backspace",
         moveIfIsFilled: !!(
            isNumber(event.key) &&
            tempInput != codeLength - 1 &&
            fieldsArray[tempInput]
         ),
         moveIfIsEmpty: isNumber(event.key) && !fieldsArray[tempInput],
      };

      if (eventType.delete) {
         setFieldsArraySetter(tempInput, "");

         if (tempInput != 0) setTempInput(tempInput - 1);
         if (counter > 0) setCounter(counter - 1);
      }
      if (eventType.moveIfIsFilled) {
         setFieldsArraySetter(tempInput + 1, event.key);

         setCounter(counter + 1);
         setTempInput(tempInput + 1);
      }
      if (eventType.moveIfIsEmpty) {
         setFieldsArraySetter(tempInput, event.key);

         if (tempInput != codeLength - 1) setTempInput(tempInput + 1);
         if (counter != codeLength) setCounter(counter + 1);
      }
   };

   const onClickHandler = (
      event: React.MouseEvent<HTMLInputElement>,
      value: number
   ) => {
      event.currentTarget.setAttribute("placeholder", "");
      setTempInput(value);
      setFieldsArray(
         fieldsArray.map((item, index) => {
            return index >= value ? "" : item;
         })
      );
   };

   const onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
      event.currentTarget.setAttribute("placeholder", "");
   };

   /* effects */
   useEffect(() => {
      arrayOfInputs.current = arrayOfInputs.current.slice(0, codeLength);
   }, []);
   useEffect(() => {
      arrayOfInputs.current[tempInput]?.focus();
   }, [tempInput]);
   useEffect(() => {
      onChange(fieldsArray.join(""));
   }, [fieldsArray]);

   return {
      tempInput,
      fieldsArray,
      arrayOfInputs,
      setFieldsArray,
      onClickHandler,
      pasteHandler,
      keyPressHandler,
      onFocusHandler,
      onChange: props.onChange,
   };
};
