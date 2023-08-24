import { Icons, Typography, Box } from '@/design-system';
import { colors } from '@/design-system/theme';

export const Empty = ({ text = 'No Results' }) => (
  <Box
    sx={{
      p: 'md',
      height: 400,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Icons.Ban size={44} color={colors.primary200} />
    <Typography variant="heading" color="primary200" text={text} />
  </Box>
);
