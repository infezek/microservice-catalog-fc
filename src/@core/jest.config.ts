export default {
  displayName: {
    name: "@core",
    color: "pink",
  },
  clearMocks: true,
  coverageDirectory: "../__coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "html"],
  coverageThreshold: {
    global: 80,
  },
  rootDir: "src",
  setupFilesAfterEnv: [
    "./@seedwork/domain/tests/validations.ts",
    "./@seedwork/domain/tests/jest.ts",
  ],
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
};
