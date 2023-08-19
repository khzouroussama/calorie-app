import { Store, useStore } from '@/shared/store';

const storeActionsSelector = (state: Store) => state.actions;

/**
 * A hook to access the store actions.
 *
 * it is safe to destruct the actions from this hook, as the hook will always return the same actions object.
 *
 * example:
 *
 *   `const { fetchAndUpdateUserProfile } = useStoreActions();`
 *
 * @returns The store actions.
 */
export const useStoreActions = () => useStore(storeActionsSelector);
