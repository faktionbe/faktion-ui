'use client';

import React from 'react';
import Markdown from 'react-markdown';

import Component from '@/components/component';

const Recipes = () => {
  const [md, setMd] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/recipes/microsoft-sso', {
          method: 'GET',
          headers: { accept: 'text/markdown' },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const text = await res.text();
        if (!cancelled) setMd(text);
      } catch (_error) {
        if (!cancelled) setError('Failed to load recipe.');
      }
    };
    load().catch(() => {
      if (!cancelled) setError('Failed to load recipe.');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Component
      name='microsoft-sso'
      description='A Microsoft SSO recipe'
      code={md}>
      <span> Check `code` tab for recipe</span>
    </Component>
  );
};

export default Recipes;
