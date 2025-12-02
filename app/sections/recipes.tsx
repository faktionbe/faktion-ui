'use client';

import React from 'react';

import Component from '@/components/component';

const Recipes = () => {
  const [md, setMd] = React.useState<string>('');

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const res = await fetch('/api/recipes/microsoft-sso', {
        method: 'GET',
        headers: { accept: 'text/markdown' },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const text = await res.text();
      if (!cancelled) setMd(text);
    };
    load().catch(() => {
      console.error('Failed to load recipe.');
    });
    return () => {
      cancelled = true;
    };
  }, []);

  console.log(md);

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
