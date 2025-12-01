import config from '@faktion-com/eslint-config/react';

const eslintConfig = [
  {
    ignores: ['registry/recipes/**'],
  },
  ...config,
];

export default eslintConfig;
