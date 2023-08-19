import { Icons, Typography } from '@/design-system';
import { curry } from 'ramda';

export const tabBarIcon = curry(
  (
    iconName: keyof typeof Icons,
    props: { focused: boolean; color: string; size: number },
  ) => {
    const Icon = Icons[iconName];
    return <Icon {...props} strokeWidth={1.5} />;
  },
);

export const tabBarLabel = curry(
  (
    label: string,
    props: { focused: boolean; color: string; children: string },
  ) => (
    <Typography
      variant="subheading"
      size="xxs"
      style={{ color: props.color }}
      text={label || props.children}
    />
  ),
);
