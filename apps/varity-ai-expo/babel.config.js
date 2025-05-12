module.exports = (api) => {
	api.cache(true);
	const plugins = [];

	plugins.push([
		"@tamagui/babel-plugin",
		{
			components: ["tamagui"],
			config: "./tamagui.config.ts",
		},
	]);

	plugins.push("react-native-reanimated/plugin");

	return {
		presets: [
			[
				"babel-preset-expo",
				{
					unstable_transformImportMeta: true,
				},
			],
		],

		plugins,
	};
};
