import { Loader } from '@mantine/core';

import { ButtonProps } from './button.interface';
import { useButtonStyles } from './buttonStyles';

const Button = ({ disabled, onClick, size, value, style }: ButtonProps) => {
  const { classes } = useButtonStyles();

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classes.defaultButton}
      style={{ width: size, ...style }}
    >
      {disabled ? <Loader size='xs' color='#1b1b1e' /> : value}
    </button>
  );
};

export default Button;
