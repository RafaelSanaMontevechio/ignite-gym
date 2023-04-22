import { Image, IImageProps } from 'native-base';

interface UserAvatarProps extends IImageProps {
  size: number;
}

export function UserAvatar({ size, ...rest }: UserAvatarProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  );
}
