import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const useIsAdmin = () => {
  const { user, authStatus } = useAuthenticator((context) => [
    context.user,
    authStatus,
  ]);

  if (authStatus !== 'authenticated') return false;

  if (user) {
    const idToken = user?.getSignInUserSession?.()?.getIdToken?.();
    // return user.getSignInUserSession().getIdToken().payload['cognito:groups'].includes(
    if (!idToken?.payload) return false;

    return idToken.payload['cognito:groups']?.includes?.(
      `admin-${process.env?.EXPO_PUBLIC_STAGE?.toLowerCase()}`,
    );
  }

  return false;
};
