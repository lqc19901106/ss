const presets = [
  [
    '@babel/preset-env',
    {
      targets: 'last 2 versions,safari >= 7,ie >= 10,chrome>=60',
      modules: false,
    },
  ],
  '@babel/preset-react',
];
const plugins = [
  ['@babel/plugin-transform-runtime', { corejs: 2 }],
   ['@babel/plugin-proposal-decorators', { legacy: true }], // Stage 2
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import', // Stage 3
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-object-rest-spread',
   'react-hot-loader/babel'
];

if (process.env.BUILD_ENV === 'local') {
  plugins.push([
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css'
    },
  ]
  );
}

module.exports = { presets, plugins };
