import { colors } from '@/design-system/theme';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react-native';

export const AuthProvider = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        tokens: {
          colors: {
            brand: {
              primary: {
                10: colors.primary100,
                20: colors.primary200,
                40: colors.primary400,
                60: colors.primary600,
                80: colors.primary600,
                90: colors.primary600,
                100: colors.primary200,
              },
            },
          },
        },
      }}
    >
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </ThemeProvider>
  );
};
