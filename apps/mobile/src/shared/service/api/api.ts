import { useAuthenticator } from '@aws-amplify/ui-react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import queryString from 'query-string';

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;

type KeyParams = Record<string, unknown>;

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])];
}

export const stringifyQueryParams = <T extends KeyParams>(params?: T) => {
  return queryString.stringify(params, { skipNull: true });
};

export const buildFormData = (params: Record<string, unknown>) => {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value as any);
  });
  return formData;
};

export function useAddAuthHeader() {
  const [isReady, setIsReady] = useState(false);
  const { user, isPending, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.isPending,
  ]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    if (user) {
      const idToken = user.getSignInUserSession().getIdToken();

      if (!idToken?.payload) return;

      axios.defaults.headers.common.Authorization = idToken.getJwtToken();

      if (!isReady) setIsReady(true);
    }
  }, [authStatus, isReady, user]);

  return { isPending, authStatus, isReady };
}
