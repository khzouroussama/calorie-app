import { useCallback, useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import axios from 'axios';

export function useBootstrapApp() {
  const [isReady, setIsReady] = useState(false);
  const { user, isPending, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.isPending,
  ]);

  const booststrap = useCallback(async () => {
    if (authStatus !== 'authenticated') return;
    if (user) {
      const idToken = user.getSignInUserSession().getIdToken();

      if (!idToken?.payload) return;

      axios.defaults.headers.common.Authorization = idToken.getJwtToken();

      if (!isReady) setIsReady(true);
    }
  }, [authStatus, isReady, user]);

  useEffect(() => {
    booststrap();
  }, [booststrap]);

  return { isPending, authStatus, isReady };
}
