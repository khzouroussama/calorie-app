import { Box, Card, Icons, Pressable, Typography } from '@/design-system';
import { format } from 'date-fns';
import { colors } from '@/design-system/theme';
import Animated, { Layout } from 'react-native-reanimated';
import { DailyCaloriesReport } from '../../reporting.types';

type DailyCaloriesCardProps = {
  dailyCaloriesItem: DailyCaloriesReport;
};

export const DailyCaloriesCard = ({
  dailyCaloriesItem,
}: DailyCaloriesCardProps) => {
  const { date, totalOfCalories } = dailyCaloriesItem;

  return (
    <Animated.View layout={Layout.duration(200)}>
      <Pressable activeScale={0.98}>
        <Card
          sx={{
            mx: 'md',
            row: true,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ row: true }}>
            {/* <Box */}
            {/*   sx={{ */}
            {/*     width: 50, */}
            {/*     height: 50, */}
            {/*     bgColor: 'secondary300', */}
            {/*     borderRadius: 8, */}
            {/*     alignItems: 'center', */}
            {/*     justifyContent: 'center', */}
            {/*     mr: 'sm', */}
            {/*   }} */}
            {/* > */}
            {/*   <Icons.Bolt color={colors.neutral100} size={32} /> */}
            {/* </Box> */}
            <Box
              sx={{
                row: true,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography color="neutral500" variant="heading" size="xs">
                {format(new Date(date), 'dd MMMM yyyy')}
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Box sx={{ row: true, alignItems: 'center' }}>
                <Icons.Bolt
                  size={24}
                  strokeWidth={1.5}
                  color={colors.primary500}
                />

                <Typography size="lg" variant="bold" color="primary500">
                  {totalOfCalories} Calories
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Pressable>
    </Animated.View>
  );
};
