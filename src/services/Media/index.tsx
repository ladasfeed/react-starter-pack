import React, { FC, useContext, useEffect, useState } from "react";
import { useStateDebounce } from "hooks/useDebounce";
import { log } from "util";

export const MediaContext = React.createContext<{
  width: number;
}>({
  width: window.innerWidth,
});

export const useMedia = () => {
  return useContext(MediaContext);
};

const MediaContextCalculations: FC<{
  setValue: (val: any) => void;
}> = ({ setValue }) => {
  const [width, setWidth] = useStateDebounce({
    initial: window.innerWidth,
    delay: 500,
  });

  useEffect(() => {
    const setWidthHandler = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", setWidthHandler);
    return () => {
      window.removeEventListener("resize", setWidthHandler);
    };
  }, [width]);
  useEffect(() => {
    setValue(width);
  }, [width]);

  return null;
};

export const MediaContextProvider: FC = (props) => {
  const [width, setWidth] = useState(0);

  return (
    <MediaContext.Provider
      value={{
        width,
      }}
    >
      {props.children}
      <MediaContextCalculations setValue={setWidth} />
    </MediaContext.Provider>
  );
};
