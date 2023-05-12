import { TouchableOpacity } from 'react-native';

import { HStack, VStack, Heading, Text, Icon } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons';

import { useAuth } from '@hooks/useAuth';
import { UserAvatar } from '@components/UserAvatar';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserAvatar
        source={{ uri: 'https://github.com/rafaelsanamontevechio.png' }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user?.name}
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
