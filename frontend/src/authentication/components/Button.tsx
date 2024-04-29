interface Props {
  name: string;
  action: () => void;
  style: 1 | 2;
}

export function Button({ name, action, style }:Props) {
  return (
    <button
    onClick={action}
      className={`font-semibold w-full border-[2px] border-black rounded-[8px] ${
        style === 1
          ? "bg-black text-white"
          : "bg-white text-black"
      } py-[10px]`}
    >
      {name}
    </button>
  );
}
