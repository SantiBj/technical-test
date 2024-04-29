import { ChangeEvent } from "react";

interface Props {
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ name, type, value, placeholder, onChange }: Props) {
  return (
    <section className="flex flex-col">
      <label className="font-semibold mb-[5px] capitalize">{name}</label>
      <input
        className="border-[2px] rounded-[8px] px-[15px] py-[8px] border-black"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </section>
  );
}
