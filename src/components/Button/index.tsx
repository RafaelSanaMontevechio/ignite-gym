import { Button as NBButton, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  text: string;
}

export function Button({ text, variant, ...rest }: ButtonProps) {
  return (
    <NBButton mb={4} {...rest}>
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontSize="md"
        fontFamily="heading"
      >
        {text}
      </Text>
    </NBButton>
  );
}
