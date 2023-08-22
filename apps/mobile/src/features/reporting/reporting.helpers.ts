import { eachDayOfInterval, format, parseISO, subDays } from 'date-fns';

export const generateUserReportChartData = (reports) => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 6);

  const lastSevenDays = eachDayOfInterval({
    start: sevenDaysAgo,
    end: today,
  }).map((date) => format(date, 'yyyy-MM-dd'));

  const totalCaloriesForDays = lastSevenDays.map((day) => {
    const reportForDay = reports.find((report) => report.date === day);
    return reportForDay ? reportForDay.totalOfCalories : 0;
  });

  return {
    labels: lastSevenDays.map((d) => format(parseISO(d), 'EEE')),
    datasets: [
      {
        data: totalCaloriesForDays,
      },
    ],
  };
};
