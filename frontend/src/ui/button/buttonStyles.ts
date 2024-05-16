import { rem, createStyles } from '@mantine/core';

export const useButtonStyles = createStyles((theme) => {
  return {
    defaultButton: {
      backgroundColor: theme.colors.indigo[5],
      borderRadius: rem(10),
      padding: rem(15),
      color: theme.colors.yellow[5],
      fontWeight: 600,
      fontSize: rem(15),
      border: 'none',
      outline: 'none',
      fontFamily: theme.fontFamily,
      transition: 'all 0.3s',
      marginTop: rem(30),
      marginBottom: rem(20),
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.colors.indigo[5],
        textShadow: `${rem(4)} ${rem(4)} ${rem(3)} rgba(255, 255, 255, 0.15)`,
      },
    },
  };
});
