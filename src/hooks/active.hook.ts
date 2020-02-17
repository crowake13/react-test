import { useObservable } from '@mindspace-io/utils';
import { ID, IEntity, IEntityFacade } from '../stores/entities/entity.facade';

export type ActiveHookDuple<T> = [T | null, (id: ID) => void];

export const useActive = <T extends IEntity<ID>>(
  service: IEntityFacade<T>
): ActiveHookDuple<T> => {
  const [entity] = useObservable(service.active$, null);

  return [entity, (id: ID) => service.activate(id)];
};
