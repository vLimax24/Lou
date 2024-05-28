import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const convertToTitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const getRandomColor = () => {
  const colors = [
    "#0089EC",
    "#00BD1F",
    "#4C4C4C",
    "#C6C4FB",
    "#FF7ABC",
    "#FF8B8B",
    "#FFB800",
    "#FFC6C6",
    "#F25325",
    "#B3B4B8",
    "#ADADAD",
    "#6ADBC6",
    "#28C62F",
    "#0CDCF8",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
