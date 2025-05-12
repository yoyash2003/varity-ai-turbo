// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Add the unstable_enablePackageExports option
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
