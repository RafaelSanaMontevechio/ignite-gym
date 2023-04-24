import { Heading, VStack, SectionList, Text } from 'native-base';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26-05-23',
      data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
      title: '27-05-23',
      data: ['French Fries', 'Onion Rings'],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mb={3}>
            {section.title}
          </Heading>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados. {'\n'}
            Vamos fazer exercícios?
          </Text>
        )}
        mt={3}
        px={6}
      />
    </VStack>
  );
}
