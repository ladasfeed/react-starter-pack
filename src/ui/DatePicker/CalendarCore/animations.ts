export const calendarAnimation = {
   open: {
      x: 0,
      opacity: 1,
      transition: {
         duration: 0.3,
      },
      display: "block",
   },
   close: {
      x: -80,
      opacity: 0,
      transition: {
         duration: 0.2,
      },
      transitionEnd: {
         display: "none",
      },
   },
};
