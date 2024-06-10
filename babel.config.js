module.exports = {
  presets: [
    '@babel/preset-env', // Transforms ES6
    ['@babel/preset-react', { runtime: 'automatic' }] // Transforms JSX and uses new JSX transform
  ],
};
