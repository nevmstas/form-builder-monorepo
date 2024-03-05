import { CiAirportSign1 } from "react-icons/ci";
import "./App.css";
import { Select, Input, Button, FormBuilder } from "./atoms";

function App() {
  return (
    <>
      <Input
        id="name-input"
        label="name"
        placeholder="type..."
        LeadingIcon={CiAirportSign1}
        hint="hint"
        helpText="help"
      />

      <Select
        name="select"
        id="select"
        label="select"
        options={[
          { value: 1, label: "option 1" },
          { value: 2, label: "option 2" },
          { value: 3, label: "option 3" },
        ]}
        placeholder="type..."
        hint="hint"
        helpText="help"
      />

      <Button
        id="button"
        fullWidth
        variant="secondary"
        onClick={() => console.log(31)}
      >
        Button
      </Button>

      <FormBuilder
        formData={[
          {
            id: "1",
            name: "message",
            componentType: "input",
            label: "Message",
          },
          {
            id: "2",
            name: "name",
            componentType: "input",
            label: "Name",
          },
          {
            id: "3",
            name: "City",
            componentType: "select",
            options: [
              { value: "bishkek", label: "Bishkek" },
              { value: "almaty", label: "Almaty" },
            ],
            label: "City",
          },
          {
            id: "4",
            name: "City",
            componentType: "select",
            label: "Empty",
          },
        ]}
        submit={(data) => console.log(data)}
      />
    </>
  );
}

export default App;
