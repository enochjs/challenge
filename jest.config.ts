export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    '^@app/(.*)$': './src/$1',
  },
  // moduleNameMapper: {
  //     '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  //         "moduleNameMapper": {
  //     "^.+\\.svg$": "jest-svg-transformer",
  //     "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  //   },
  // },
}