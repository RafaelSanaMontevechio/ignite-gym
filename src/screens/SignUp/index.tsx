import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';

import BackgroundImg from '@assets/background.png';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBackToLogin() {
    navigation.navigate('signIn');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator
    >
      <VStack flex={1} bg="gray.700" px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>
        </Center>

        <Center>
          <Input placeholder="Nome" />
          <Input placeholder="E-mail" secureTextEntry />
          <Input placeholder="Senha" secureTextEntry />

          <Button text="Criar e acessar" variant="solid" />
        </Center>

        <Center mt={24}>
          <Button text="Voltar para login" onPress={handleGoBackToLogin} />
        </Center>
      </VStack>
    </ScrollView>
  );
}
