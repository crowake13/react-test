import { useObservable } from '@mindspace-io/utils';
import { ID, IEntity, IEntityFacade } from '../stores/entities/entity.facade';

export type FetchPostsHookTuple = [boolean, boolean, () => Promise<void>];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export function useFetch<T extends IEntity<ID>>(
  service: IEntityFacade<T>,
  slug: string
): FetchPostsHookTuple {
  const [isFetching] = useObservable(service.isFetching$, service.isFetching);

  return [
    isFetching[slug],
    service.errors[slug],
    () => service.fetch(slug, true)
  ];
}
