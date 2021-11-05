import React, { useEffect, useRef } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { useMedia } from "services/Media";
import { Schema } from "helpers/builders/yup";
import { InputTest, InputText } from "ui/Input/InputText";
import { Calendar } from "ui/DatePicker";
import { InputTextBuilder, RSPHooks } from "react-starter-pack";

const Test = () => {
  const { width } = useMedia();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = RSPHooks.useToggle(false);

  RSPHooks.useBlurred(ref, setIsOpen, isOpen);
  useEffect(() => {}, []);
  console.log("Test rer");
  return (
    <div
      style={{
        fontSize: 30,
      }}
    >
      {width}
    </div>
  );
};

function App() {
  const form = useForm({
    resolver: Schema.resolver(
      Schema.create({
        email: Schema.schemas.password(),
      })
    ),
  });

  console.log(form.formState.errors);
  return (
    <div className="App">
      <form onSubmit={form.handleSubmit(() => null)}>
        <InputTest.Default
          control={form.control}
          name={"email"}
          error={form.formState?.errors?.email?.message}
        />
        <Calendar name={"date"} control={form.control} />
        <button>Fuck</button>
      </form>
      {/*<Test />*/}
    </div>
  );
}

export default App;
