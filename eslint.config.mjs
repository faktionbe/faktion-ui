import config from '@faktion-com/eslint-config/react';

const eslintConfig = [
  {
    ignores: ['registry/recipes/**', 'registry/hooks/use-file-download.tsx'],
  },
  ...config,
];

export default eslintConfig;
