import { IconType } from "react-icons";
import { Button, Input, Select } from "..";
import { useState } from "react";

interface IOption {
  value: string | number;
  label: string;
  key?: string;
  isDisabled?: boolean;
}

export interface IFormItem {
  id: string;
  name: string;
  label: string;
  componentType: "input" | "select";
  options?: IOption[];
  type?: string;
  hint?: string;
  helpText?: string;
  errorMessage?: string;
  LeadingIcon?: IconType;
  leadingAction?: () => void;
  TrailingIcon?: IconType;
  trailingAction?: () => void;
  hideLabel?: boolean;
}

interface IProps {
  formData: Array<IFormItem>;
  submit: (props: Record<string, string>) => void;
}

const components = {
  input: Input,
  select: Select,
};

export default ({
  formData,
  submit,
}: React.PropsWithChildren<IProps>): JSX.Element => {
  const [form, setForm] = useState<Record<string, string>>({});

  const handlers = {
    input: (e: React.FormEvent<any>) => {
      const target = e.target as HTMLInputElement;
      setForm((values) => ({
        ...values,
        [target.name]: target.value,
      }));
    },
    select: (e: React.FormEvent<any>) => {
      const target = e.target as HTMLSelectElement;
      setForm((values) => ({
        ...values,
        [target.name]: target.value,
      }));
    },
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(form);
  };

  return (
    <form onSubmit={onSubmit}>
      {formData.map((field) => {
        const { componentType, ...props } = field;

        const Component = components[componentType];
        const handler = handlers[componentType];

        return <Component key={props.id} onChange={handler} {...props} />;
      })}
      <Button id="submit button" type="submit">
        Submit
      </Button>
    </form>
  );
};
