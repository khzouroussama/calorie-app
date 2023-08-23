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
