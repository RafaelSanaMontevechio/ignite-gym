import { useState } from 'react';

import { TouchableOpacity } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserAvatar } from '@components/UserAvatar';
import { ScreenHeader } from '@components/ScreenHeader';

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/rafaelsanamontevechio.png',
  );
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const PHOTO_SIZE = 33;

  const toast = useToast();

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true);

      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedPhoto.canceled) return;

      if (selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          selectedPhoto.assets[0].uri,
        );

        //@ts-ignore
        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'Essa image é muito grande',
            placement: 'top',
            bgColor: 'red.500',
          });
        }

        setUserPhoto(selectedPhoto.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
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
