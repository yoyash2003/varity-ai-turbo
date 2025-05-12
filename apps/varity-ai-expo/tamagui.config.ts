import { createAnimations } from "@tamagui/animations-react-native";
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { tokens } from "@tamagui/themes";
import { ImageBackground as RNImageBackground } from "react-native";
import { Stack } from "tamagui";

import {
	Button as BaseButton,
	H1,
	SizableText,
	YStack,
	createTamagui,
	styled,
} from "tamagui";

// 1. Animations
const animations = createAnimations({
	bouncy: {
		type: "spring",
		damping: 10,
		stiffness: 100,
		mass: 0.9,
	},
	lazy: {
		type: "spring",
		damping: 20,
		stiffness: 60,
	},
	quick: {
		type: "spring",
		damping: 20,
		stiffness: 250,
		mass: 1.2,
	},
});

// 2. Fonts
const headingFont = createInterFont({
	// Customize weights, letterSpacing, etc. if desired
});

const bodyFont = createInterFont({
	// Customize weights, letterSpacing, etc. if desired
});

// 3. Base (light) theme
const light = {
	// For backgrounds
	background: "#ffffff",

	// special colors vibrant
	red: "#FF2B22",
	orange: "#F38004",
	yellow: "#F3BA00",
	green: "#1BBB30",
	mint: "#06B5AB",
	teal: "#289DB5",
	cyan: "#39A6D7",
	blue: "#0065F3",
	indigo: "#4A48C5",
	purple: "#9543C1",
	pink: "#F32042",
	brown: "#8D6F4A",
	gray: "#79797F",

	// Light Mode (non-transparent Black Shades)
	color01: "#000000",
	color02: "#121212",
	color03: "#404040",
	color04: "#808080",
	color05: "#BFBFBF",
	color06: "#ECECEC",
	color07: "#FAFAFA",

	// Light Mode (Black Shades)
	color1: "rgba(0, 0, 0, 1.0)",
	color2: "rgba(0, 0, 0, 0.93)",
	color3: "rgba(0, 0, 0, 0.75)",
	color4: "rgba(0, 0, 0, 0.50)",
	color5: "rgba(0, 0, 0, 0.25)",
	color6: "rgba(0, 0, 0, 0.075)",
	color7: "rgba(0, 0, 0, 0.02)",

	// Light Mode (White Shades)
	color11: "rgba(255, 255, 255, 1.0)",
	color12: "rgba(255, 255, 255, 0.93)",
	color13: "rgba(255, 255, 255, 0.75)",
	color14: "rgba(255, 255, 255, 0.50)",
	color15: "rgba(255, 255, 255, 0.25)",
	color16: "rgba(255, 255, 255, 0.075)",
	color17: "rgba(255, 255, 255, 0.02)",
};

// 4. Dark theme
const dark: typeof light = {
	background: "#070707",

	// special colors vibrant
	red: "#FF463C",
	orange: "#FF9F16",
	yellow: "#FFDC16",
	green: "#35DD4B",
	mint: "#61DCD6",
	teal: "#3CCEEA",
	cyan: "#50C6F9",
	blue: "#1683FF",
	indigo: "#5856F0",
	purple: "#C55AFF",
	pink: "#FF395E",
	brown: "#AD8D67",
	gray: "#98989D",

	// Dark Mode (non-transparent White Shades)
	color01: "#ffffff",
	color02: "#ededed",
	color03: "#bfbfbf",
	color04: "#808080",
	color05: "#404040",
	color06: "#131313",
	color07: "#050505",

	// Dark Mode (Light Shades)
	color1: "rgba(255, 255, 255, 1.0)",
	color2: "rgba(255, 255, 255, 0.93)",
	color3: "rgba(255, 255, 255, 0.75)",
	color4: "rgba(255, 255, 255, 0.50)",
	color5: "rgba(255, 255, 255, 0.25)",
	color6: "rgba(255, 255, 255, 0.075)",
	color7: "rgba(255, 255, 255, 0.02)",

	// Dark Mode (Dark Shades)
	color11: "rgba(0, 0, 0, 1.0)",
	color12: "rgba(0, 0, 0, 0.93)",
	color13: "rgba(0, 0, 0, 0.75)",
	color14: "rgba(0, 0, 0, 0.50)",
	color15: "rgba(0, 0, 0, 0.25)",
	color16: "rgba(0, 0, 0, 0.075)",
	color17: "rgba(0, 0, 0, 0.02)",
};

// note: we set up a single consistent base type to validate the rest:
type BaseTheme = typeof light;

export const themes = {
	dark,
	light,
} satisfies { [key: string]: BaseTheme };
// note: `satisfies` was introduced with TypeScript 4.9

// Update the media configuration
const media = {
	xs: { maxWidth: 660 },
	sm: { maxWidth: 800 },
	md: { maxWidth: 1020 },
	lg: { maxWidth: 1280 },
	xl: { maxWidth: 1420 },
	xxl: { maxWidth: 1600 },
	gtXs: { minWidth: 661 },
	gtSm: { minWidth: 801 },
	gtMd: { minWidth: 1021 },
	gtLg: { minWidth: 1281 },
	short: { maxHeight: 820 },
	tall: { minHeight: 820 },
	hoverNone: { hover: "none" },
	pointerCoarse: { pointer: "coarse" },
};

// 6. Create Tamagui config
const config = createTamagui({
	animations,
	shouldAddPrefersColorThemes: true,
	themeClassNameOnRoot: true,
	shorthands,
	// We keep the default "body" font for text, "heading" for headings
	defaultFont: "body",
	fonts: {
		body: bodyFont,
		heading: headingFont,
		InterMedium: bodyFont,
	},
	themes,
	tokens,
	media,
});

// 7. Styled components (using tokens & theme references)

// Container for basic layouts
export const Container = styled(Stack, {
	name: "Container",
	f: 1,
	jc: "center",
	bc: "$background",
	"$platform-web": {
		pt: 18,
	},
});

// Typical "Main" container for content
export const Main = styled(YStack, {
	name: "Main",
	f: 1,
	"$platform-web": {
		maxWidth: 660,
	},
	bc: "$background",
	overflow: "hidden",
	borderRadius: 15,
});

// Heading Title
export const Title = styled(H1, {
	name: "Title",
	color: "$color",
	fontFamily: "$heading",
	size: "$12",
});

// Subtitle or subheading text
export const Subtitle = styled(SizableText, {
	name: "Subtitle",
	color: "#38434D",
	fontFamily: "$body",
	size: "$9",
});

// Primary background image
export const ImageBackgroundPrimary = styled(RNImageBackground, {
	name: "ImageBackgroundPrimary",
	flex: 1,
	backgroundColor: "$background",
	source: require("./assets/wallpapers.png"),
});

// Secondary background image
export const ImageBackgroundSecondary = styled(RNImageBackground, {
	name: "ImageBackgroundSecondary",
	flex: 1,
	backgroundColor: "$background",
	source: require("./assets/wall.png"),
});

export const ContainerPrimary = styled(YStack, {
	name: "ContainerPrimary",
	flex: 1,
	backgroundColor: "$background",
});

// Reusable button component
export const ButtonLarge = styled(BaseButton, {
	name: "ButtonXL",
	h: 52,
	backgroundColor: "$color2",
	borderRadius: 15,
	maxWidth: 440,
	w: "100%",

	alignSelf: "center",

	hoverStyle: {
		opacity: 0.8,
	},
	pressStyle: {
		opacity: 0.8,
	},

	// Simple shadow
	shadowColor: "#000000",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
});

export const ButtonMedium = styled(BaseButton, {
	name: "ButtonMedium",
	h: 40,
	backgroundColor: "transparent",
	borderRadius: 15,

	hoverStyle: {
		backgroundColor: "transparent",
		borderColor: "transparent",
	},
	pressStyle: {
		backgroundColor: "transparent",
		borderColor: "transparent",
	},

	// // Simple shadow
	// shadowColor: "#000000",
	// shadowOffset: {
	// 	width: 0,
	// 	height: 2,
	// },
	// shadowOpacity: 0.25,
	// shadowRadius: 3.84,
});

export const SmallButton = styled(BaseButton, {
	name: "SmallButton",
	size: "$3",
	aspectRatio: 1,
	backgroundColor: "transparent",
	borderRadius: 1000,
	p: 8,

	hoverStyle: {
		backgroundColor: "$color6",
		borderColor: "$color6",
	},
	pressStyle: {
		backgroundColor: "$color6",
		borderColor: "$color6",
	},

	// // Simple shadow
	// shadowColor: "#000000",
	// shadowOffset: {
	// 	width: 0,
	// 	height: 2,
	// },
	// shadowOpacity: 0.25,
	// shadowRadius: 3.84,
});

// 8. Types
type AppConfig = typeof config;

declare module "tamagui" {
	// For helpful type completions when using Tamagui
	interface TamaguiCustomConfig extends AppConfig { }
}

// 9. Export the config for use in your App.tsx / _app.tsx
export default config;
