import { useObservable } from '@mindspace-io/utils';
import { ID, IEntity, IEntityFacade } from '../stores/entities/entity.facade';

export type FetchHookTuple = [
  boolean,
  boolean,
  (set?: boolean, delay?: number) => Promise<void>
];

/**
 * Custom Hook to manage a view Model for Post view components
 */
export const useFetch = <T extends IEntity<ID>>(
  service: IEntityFacade<T>,
  slug: string
): FetchHookTuple => {
  const [isFetching] = useObservable(service.isFetching$, service.isFetching);

  return [
    isFetching[slug],
    service.errors[slug],
    (set: boolean = false, delay: number = 0) => service.fetch(slug, set, delay)
  ];
};
