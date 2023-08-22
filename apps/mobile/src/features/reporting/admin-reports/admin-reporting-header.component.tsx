import { Box, Card, Icons, Typography } from '@/design-system';
import { useAdminGetGlobalReports } from './use-admin-get-global-reports';
import { ActivityIndicator } from 'react-native';
import { useMemo } from 'react';
import { parseISO, subDays } from 'date-fns';
import { colors } from '@/design-system/theme';

const getEntryCounts = (reports) => {
  const today = new Date();
  const oneWeekAgo = subDays(today, 7);
  const twoWeeksAgo = subDays(today, 14);

  let countLastWeek = 0;
  let countPrevWeek = 0;

  for (const report of reports) {
    const reportDate = parseISO(report.date);
    if (reportDate > oneWeekAgo) {
      countLastWeek += report.count;
    } else if (reportDate <= oneWeekAgo && reportDate > twoWeeksAgo) {
      countPrevWeek += report.count;
    }
  }

  return {
    countLastWeek,
    countPrevWeek,
  };
};

export const AdminReportingHeader = () => {
  const { data: { data: { data: { reports } = {} } = {} } = {}, isLoading } =
    useAdminGetGlobalReports();

  console.log({
    reports,
  });

  const { countPrevWeek, countLastWeek } = useMemo(() => {
    if (!reports)
      return {
        countPrevWeek: 0,
        countLastWeek: 0,
      };
    return getEntryCounts(reports);
  }, [reports]);

  const diff = countLastWeek - countPrevWeek;

  return (
    <Card style={{ minHeight: 80 }} sx={{}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Box
          sx={{
            row: true,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="heading" color="primary400" size="sm">
              Food entries this week
            </Typography>
            <Typography color="primary500" variant="bold" size="xl">
              {countLastWeek} Entries
            </Typography>

            <Box sx={{ my: 'xxs' }} />

            <Typography variant="subheading" size="xs" color="neutral500">
              Food entries from last week
            </Typography>

            <Typography color="secondary400" variant="bold" size="sm">
              {countPrevWeek} Entries{' '}
              {diff > 0 ? (
                <Typography variant="bold" size="sm" color="secondary500">
                  (+{diff})
                </Typography>
              ) : (
                <Typography variant="bold" size="sm" color="angry500">
                  (-{diff})
                </Typography>
              )}
            </Typography>
          </Box>
          <Box sx={{ mx: 'md' }}>
            <Icons.ListCheck
              size={44}
              color={colors.primary500}
              strokeWidth={1.5}
            />
          </Box>
        </Box>
      )}
    </Card>
  );
};
