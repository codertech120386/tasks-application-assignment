import { rem, createStyles } from '@mantine/core';

export const useRegisterStyles = createStyles((theme: any) => {
  return {
    container: {
      backgroundColor: theme.colors.gray[3],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    },

    panes: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
    },

    loginBannerBox: {
      width: '50%',
      height: '100vh',

      img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },

    // Login Form

    welcomeText: {
      fontWeight: 600,
      fontSize: rem(30),
      color: theme.colors.indigo[5],
      textAlign: 'center',
      marginBottom: rem(24),
    },

    backToLoginText: {
      textAlign: 'center',
      marginBottom: rem(20),
      fontSize: rem(12),
      fontWeight: 500,
      color: theme.colors.gray[5],
      '& span': {
        fontSize: rem(12),
        fontWeight: 500,
        color: theme.colors.indigo[5],
        cursor: 'pointer',
      },
    },
  };
});
