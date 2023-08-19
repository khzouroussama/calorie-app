import { Card, Typography } from '@/design-system';
import { FoodEntry } from '../food-entries.types';
import { Pressable } from 'react-native';

type FoodEntryCardProps = {
  foodEntry: FoodEntry;
  onPress?: () => void;
};

export const FoodEntryCard = ({ foodEntry, onPress }: FoodEntryCardProps) => {
  const { name, calories, consumptionDate, photoUrl } = foodEntry;

  return (
    <Pressable>
      <Card>
        <Typography>{name}</Typography>
        <Typography>{calories}</Typography>
      </Card>
    </Pressable>
  );
};
