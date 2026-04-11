import { useEffect, useMemo, useState } from 'react';
import { computeEffectiveStage } from './scisStatelogic';
import { createLocalScisStore } from './scisStore';
import type { ScisInitiative } from './scisTypes';

// Singleton store instance (client-only safe because it no-ops SSR)
const store = createLocalScisStore();

export function useScisStore() {
  return store;
}

export function useScisLocalInitiatives(): ScisInitiative[] {
  const [version, setVersion] = useState(0);

  useEffect(() => store.subscribe(() => setVersion((v) => v + 1)), []);

  // version only triggers re-render; actual data pulled from store
  void version;

  return useMemo(() => {
    const initiatives = store.list();
    // attach effective stage in-memory if you want (don’t persist computed value)
    return initiatives.map((i) => ({
      ...i,
      stage: computeEffectiveStage(i),
    }));
  }, [version]);
}
