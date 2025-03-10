module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel'
    ],
    plugins: [
      [
        'module-resolver', {
          root: ['./src'],
          alias: {
            '@@types': './src/@types',
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@layouts': './src/layouts',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@utils': './src/utils',
          }
        }
      ]
    ]
  }
}