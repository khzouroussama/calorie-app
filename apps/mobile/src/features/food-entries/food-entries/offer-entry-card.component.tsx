import { Box, Card, Icons, Pressable, Typography } from '@/design-system';
import { FoodEntry } from '../food-entries.types';
import { formatRelative } from 'date-fns';
import { colors } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';
import Animated, { Layout } from 'react-native-reanimated';

type FoodEntryCardProps = {
  foodEntry: FoodEntry;
};

export const FoodEntryCard = ({ foodEntry }: FoodEntryCardProps) => {
  const navigation = useNavigation();
  const { name, calories, consumptionDate, photoUrl } = foodEntry;

  return (
    <Animated.View layout={Layout.duration(200)}>
      <Pressable
        activeScale={0.98}
        onPress={() => {
          navigation.navigate('UserEditFoodEntry');
        }}
      >
        <Card
          sx={{
            mx: 'md',
            row: true,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ row: true }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                bgColor: 'neutral300',
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
          <Box sx={{ row: true, alignItems: 'center' }}>
            <Icons.Bolt size={18} strokeWidth={1.5} color={colors.primary500} />
            <Typography size="xs" variant="bold" color="primary500">
              {calories} Cal
            </Typography>
          </Box>
        </Card>
      </Pressable>
    </Animated.View>
  );
};
