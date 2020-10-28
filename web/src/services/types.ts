import { IconType } from "react-icons";

export interface Icon {
  icon: IconType;
  link: string;
}

export interface Example {
  id: string;
  options: Option[];
  name: string;
  optional?: string;
  createdAt: number;
}

interface Option {
  name: string;
  value: string;
}
