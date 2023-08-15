import { useMMKVBoolean } from 'react-native-mmkv';
import { storageClient } from '../service/storage/storage';

export const useIsFirstAppStart = () => {
  const [isFirst, setIsFirst] = useMMKVBoolean(
    'common/is-first-app-start',
    storageClient,
  );
  if (isFirst === undefined) {
    return [true, setIsFirst] as const;
  }
  return [isFirst, setIsFirst] as const;
};
