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

export function useAddAuthHeader() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, isPending, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.isPending,
  ]);

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common.Authorization = user
        ?.getSignInUserSession()
        .getIdToken()
        .getJwtToken();

      if (
        user
          ?.getSignInUserSession()
          ?.getIdToken()
          .payload['cognito:groups']?.includes?.(
            `admin-${process.env?.EXPO_PUBLIC_STAGE?.toLowerCase()}`,
          )
      ) {
        setIsAdmin(true);
      }
    }
  }, [user]);

  return { isPending, authStatus, isAdmin };
}
