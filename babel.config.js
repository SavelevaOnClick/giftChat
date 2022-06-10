module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.tsx', '.android.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@components': ['./src/components'],
          '@screens': ['./src/screens'],
          '@hooks': ['./src/hooks'],
          '@assets': ['./src/assets']
        },
        cwd: 'packagejson',
      },
    ],
    'react-native-reanimated/plugin',
  ],

};
