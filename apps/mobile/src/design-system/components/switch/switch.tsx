import { Switch as RNGHSwitch } from 'react-native-gesture-handler';
import { colors } from '@/design-system/theme';

type SwitchProps = React.ComponentProps<typeof RNGHSwitch>;

export const Switch = (props: SwitchProps) => {
  return (
    <RNGHSwitch
      trackColor={{
        true: colors.primary500,
        false: colors.neutral300,
      }}
      {...props}
    />
  );
};
