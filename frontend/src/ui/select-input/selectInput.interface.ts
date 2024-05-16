import React from "react";

export interface SelectInputProps {
  label: string;
  placeholder?: string;
  data: string[];
  onChange?: (value: string) => void;
  value: string;
  style?: React.CSSProperties;
}
