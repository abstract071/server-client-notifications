module.exports = {
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx'
  ],
  'moduleDirectories': [
    'node_modules',
    'src'
  ],
  'moduleNameMapper': {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },
  'transform': {
    '^.+\\.(tsx?|jsx?)$': 'ts-jest'
  },
  'testMatch': [
    '**/?(*.)+(test).(ts?(x)|js?(x))'
  ],
  'setupFilesAfterEnv': ['<rootDir>/setup.tests.ts']
}
