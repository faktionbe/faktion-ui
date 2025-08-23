import { useMemo } from 'react';

import registry from '@/registry.json';

type RegistryItem = (typeof registry.items)[number];

interface UseCategoriesProps {
  defaultCategory?: string;
}
export function useCategories({
  defaultCategory = 'components',
}: UseCategoriesProps = {}) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add(defaultCategory);
    registry.items.forEach((item) => {
      item.categories?.forEach((category) => {
        set.add(category);
      });
    });
    return Array.from(set);
  }, [defaultCategory]);

  const itemsPerCategory = useMemo(() => {
    const map = new Map<string, Array<RegistryItem>>();

    categories.forEach((category) => {
      if (category === defaultCategory) {
        map.set(
          category,
          registry.items.filter(
            (item) => !item.categories || item.categories?.length === 0
          )
        );
      } else {
        map.set(
          category,
          registry.items.filter((item) => item.categories?.includes(category))
        );
      }
    });

    return map;
  }, [categories]);

  return { categories, itemsPerCategory };
}
