import { Lora } from "next/font/google";

export const lora = Lora({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
});
