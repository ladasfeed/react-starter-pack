import React from "react";
import "./App.css";
import { InputText } from "ui/Input/InputText";
import { useForm } from "react-hook-form";
import { Calendar } from "ui/DatePicker";

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
    </div>
  );
}

export default App;
