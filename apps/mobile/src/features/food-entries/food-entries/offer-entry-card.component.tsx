import { Box, Card, Icons, Pressable, Typography } from '@/design-system';
import { FoodEntry } from '../food-entries.types';
import { formatRelative } from 'date-fns';
import { colors } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';

type FoodEntryCardProps = {
  foodEntry: FoodEntry;
};

export const FoodEntryCard = ({ foodEntry }: FoodEntryCardProps) => {
  const navigation = useNavigation();
  const { name, calories, consumptionDate, photoUrl } = foodEntry;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('UserEditFoodEntry');
      }}
    >
      <Card sx={{ row: true, justifyContent: 'space-between' }}>
        <Box sx={{ row: true }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              bgColor: 'secondary400',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              mr: 'sm',
            }}
          >
            <Icons.Buguette color={colors.neutral100} size={32} />
          </Box>
          <Box>
            <Typography color="neutral700" variant="heading" size="md">
              {name}
            </Typography>
            <Typography variant="default" size="xs">
              {formatRelative(new Date(consumptionDate), new Date())}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ row: true }}>
          <Icons.Bolt color={colors.primary500} />
          <Typography color="primary500">{calories} Cal</Typography>
        </Box>
      </Card>
    </Pressable>
  );
};
