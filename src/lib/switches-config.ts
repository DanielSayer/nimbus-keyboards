export type Switch = {
  id: "red" | "blue" | "brown" | "black";
  name: string;
  color: string;
  bgColor: string;
};

export const switches: Switch[] = [
  {
    id: "blue",
    name: "Blue Max",
    color: "#0F80E7",
    bgColor: "bg-sky-950",
  },
  {
    id: "red",
    name: "Red Max",
    color: "#C92627",
    bgColor: "bg-red-950",
  },
  {
    id: "brown",
    name: "Brown Max",
    color: "#6E3205",
    bgColor: "bg-amber-950",
  },
  {
    id: "black",
    name: "Black Max",
    color: "#000000",
    bgColor: "bg-gray-900",
  },
] as const;

export const SOUNDS_MAP: Record<Switch["id"], string[]> = {
  red: ["/sounds/red-1.mp3", "/sounds/red-2.mp3", "/sounds/red-3.mp3"],
  blue: ["/sounds/blue-1.mp3", "/sounds/blue-2.mp3", "/sounds/blue-3.mp3"],
  brown: ["/sounds/brown-1.mp3", "/sounds/brown-2.mp3", "/sounds/brown-3.mp3"],
  black: ["/sounds/black-1.mp3", "/sounds/black-2.mp3", "/sounds/black-3.mp3"],
};
