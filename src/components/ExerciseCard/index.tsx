import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { HStack, Heading, Image, Text, VStack, Icon } from 'native-base';

import { Entypo } from '@expo/vector-icons';

import { API } from '@services/api';

import { ExerciseDTO } from '@dtos/exercisesDTO';

interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO;
}

export function ExerciseCard({ exercise, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${API.defaults.baseURL}/exercises/thumb/${exercise.thumb}`,
          }}
          alt="Imgem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {exercise.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {exercise.series} seríes {exercise.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
