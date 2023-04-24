import { useState } from 'react';

import { TouchableOpacity } from 'react-native';

import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
} from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserAvatar } from '@components/UserAvatar';
import { ScreenHeader } from '@components/ScreenHeader';

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const PHOTO_SIZE = 33;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserAvatar
              source={{ uri: 'https://github.com/rafaelsanamontevechio.png' }}
              alt="foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome" bg="gray.600" />
          <Input value="rafael_sana@hotmail.com" bg="gray.600" isDisabled />
        </Center>

        <VStack px={10} mt={8} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>

          <Input secureTextEntry placeholder="Senha antiga" bg="gray.600" />
          <Input secureTextEntry placeholder="Nova senha" bg="gray.600" />
          <Input secureTextEntry placeholder="Confirme a senha" bg="gray.600" />

          <Button text="Atualiza" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
