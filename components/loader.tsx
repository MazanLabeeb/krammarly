import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export default function Loader({ className }: Props) {
  return (
    <div
      className={twMerge(
        "w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin",
        className
      )}
    ></div>
  );
}
