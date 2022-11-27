export default {
  ...require('../jest.config').default,
  displayName: {
    name: 'nestjs-e2e',
    color: 'yellow',
  },
  rootDir: './',
  testRegex: '.*\\.e2e-spec\\.ts$',
  maxWorkers: 1,
  setupFiles: ['<rootDir>/setup-test.ts'],
  setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
  moduleNameMapper: {
    '@fc/core/(.*)$': '<rootDir>/../../../node_modules/@fc/core/dist/$1',
    '#seedwork/(.*)$':
      '<rootDir>/../../../node_modules/@fc/core/dist/@seedwork/$1',
    '#category/(.*)$':
      '<rootDir>/../../../node_modules/@fc/core/dist/category/$1',
  },
};
