module.exports = function (api) {
  api.cache(true);
  const plugins = [
    ["babel-plugin-dotenv", {
      "replacedModuleName": "react-native-dotenv"
    }]
  ];
  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
