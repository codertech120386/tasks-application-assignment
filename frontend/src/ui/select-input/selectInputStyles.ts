import { rem } from "@mantine/core";
import { theme } from "../../utils/theme";

export const selectInputStyles = {
  wrapper: {
    // display: "inline-block",
    // position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    fontSize: rem(14),
    border: `${rem(2)} solid ${theme.colors.gray[0]}`,
    borderRadius: rem(10),
    padding: `${rem(25)} ${rem(20)}`,
    backgroundColor: theme.colors.white[0],
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    transition: "all 0.3s",
    "&:focus": {
      outline: "none",
      boxShadow: `rgba(33, 35, 38, 0.1) ${rem(0)} ${rem(10)} ${rem(10)} ${rem(
        -10
      )};`,
      border: `${rem(2)} solid ${theme.colors.gold[7]}`,
    },
    "&::placeholder": {
      color: "#adadad",
    },
  },
  item: {
    "&:hover": {
      backgroundColor: theme.colors.white[1],
    },
    "&[data-selected]": {
      backgroundColor: theme.colors.gold[9],
      "&:hover": {
        backgroundColor: theme.colors.gold[9],
      },
    },
  },
  label: {
    marginBottom: rem(8),
    fontSize: rem(14),
    fontWeight: 500,
    color: theme.colors.gray[2],
  },
};
