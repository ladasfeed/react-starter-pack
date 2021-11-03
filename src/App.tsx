import React from "react";
import "./App.css";
import { InputText } from "ui/Input/InputText";
import { useForm } from "react-hook-form";
import { Calendar } from "ui/DatePicker";
import { Switch } from "ui/Switch";
import { CheckInput } from "ui/Checkbox/CheckInput";

function App() {
  const form = useForm();
  return (
    <div className="App">
      <Calendar placeholder="Blob" control={form.control} name="date" />
      <InputText.Default
        placeholder="Blob"
        control={form.control}
        name="default"
      />
      <InputText.Editable
        placeholder="Blob"
        control={form.control}
        name="editable"
      />
      <InputText.Password
        placeholder="Blob"
        control={form.control}
        name="password"
      />
      <InputText.Numeric
        placeholder="Blob"
        control={form.control}
        name="password"
      />
      <InputText.Lock placeholder="Blob" control={form.control} name="lock" />
      <CheckInput.default
        inputType={"checkbox"}
        customPayload={{ text: "Blues" }}
        label={"Чекай мать"}
        control={form.control}
        name={"check"}
      />
      <CheckInput.group
        inputType="radio"
        control={form.control}
        name={"chgr"}
        options={[
          {
            value: "12",
            customPayload: {
              text: "ESN",
            },
          },
          {
            value: "1232",
            customPayload: {
              text: "USN",
            },
          },
        ]}
      />
      <Switch.default control={form.control} name={"switch"} />
    </div>
  );
}

export default App;
