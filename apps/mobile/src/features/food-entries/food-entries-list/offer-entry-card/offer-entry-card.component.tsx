import { ActivityIndicator, Animated as RNAnimated } from 'react-native';
import { Box, Card, Icons, Pressable, Typography } from '@/design-system';
import { formatRelative } from 'date-fns';
import { colors } from '@/design-system/theme';
import { useNavigation } from '@react-navigation/native';
import Animated, { Layout } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { useCallback } from 'react';
import { useDeleteFoodEntry } from './use-delete-food-entry';
import { FoodEntry } from '../../food-entries.types';
import { useIsAdmin } from '@/shared/hooks';
import { useAdminDeleteFoodEntry } from './use-admin-delete-food-entry';
import { pair } from 'ramda';
import { Image } from 'react-native';

type FoodEntryCardProps = {
  foodEntry: FoodEntry;
};

export const FoodEntryCard = ({ foodEntry }: FoodEntryCardProps) => {
  const navigation = useNavigation();
  const { name, calories, consumptionDate, userId, photo } = foodEntry;
  const { mutate: deleteFoodEntry, isLoading } = useDeleteFoodEntry();
  const { mutate: adminDeleteFoodEntry, isLoading: isAdminDeleteLoading } =
    useAdminDeleteFoodEntry();

  const isAdmin = useIsAdmin();

  const handleDeleteFoodEntry = useCallback(() => {
    if (isAdmin) {
      adminDeleteFoodEntry({ id: consumptionDate, userId });
    } else {
      deleteFoodEntry({ id: consumptionDate });
    }
  }, [adminDeleteFoodEntry, consumptionDate, deleteFoodEntry, isAdmin, userId]);

  const renderRightActions = useCallback(
    (progress: RNAnimated.AnimatedInterpolation<number>) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [80, 0],
      });

      const opacity = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      });

      return (
        <RNAnimated.View style={{ opacity, transform: [{ translateX }] }}>
          <Pressable onPress={handleDeleteFoodEntry}>
            <Box
              sx={{
                mr: 'md',
                height: '100%',
                width: 80,
                bgColor: 'angry100',
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isLoading || isAdminDeleteLoading ? (
                <ActivityIndicator color={colors.angry500} size={28} />
              ) : (
                <Icons.Trashtabler color={colors.angry500} size={28} />
              )}
            </Box>
          </Pressable>
        </RNAnimated.View>
      );
    },
    [handleDeleteFoodEntry, isAdminDeleteLoading, isLoading],
  );

  return (
    <Animated.View layout={Layout.duration(200)}>
      <Swipeable friction={2} renderRightActions={renderRightActions}>
        <Pressable
          activeScale={0.98}
          onPress={() => {
            navigation.navigate(
              isAdmin ? 'AdminEditFoodEntry' : 'UserEditFoodEntry',
              {
                id: new Date(consumptionDate).toISOString(),
                name,
                calories,
                consumptionDate,
                userId,
                photo: {
                  uri: photo?.uri,
                },
              },
            );
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
                  overflow: 'hidden',
                }}
              >
                {photo.uri ? (
                  <Image source={{ uri: photo.uri }} height={50} width={50} />
                ) : (
                  <Icons.Buguette color={colors.neutral100} size={32} />
                )}
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
              <Icons.Bolt
                size={18}
                strokeWidth={1.5}
                color={colors.primary500}
              />
              <Typography size="xs" variant="bold" color="primary500">
                {calories} Cal
              </Typography>
            </Box>
          </Card>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
};
