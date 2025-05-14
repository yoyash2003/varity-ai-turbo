import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
// import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import config from "../tamagui.config";
import { ConvexReactClient } from "convex/react";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

import { ConvexAuthProvider } from "@convex-dev/auth/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL ?? "", {
	unsavedChangesWarning: false,
});

const secureStorage = {
	getItem: SecureStore.getItemAsync,
	setItem: SecureStore.setItemAsync,
	removeItem: SecureStore.deleteItemAsync,
};

const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});
convexQueryClient.connect(queryClient);

export default function RootLayout() {
	const currentTheme = "dark";

	const { left, top, right } = useSafeAreaInsets();

	if (Platform.OS === "android") {
		NavigationBar.setBackgroundColorAsync(
			currentTheme === "dark" ? "#000000" : "#FFFFFF",
		);
	}

	const [loaded] = useFonts({
		InterBlack: require("@tamagui/font-inter/otf/Inter-Black.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
		InterSemiBold: require("@tamagui/font-inter/otf/Inter-SemiBold.otf"),
		InterMedium: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterRegular: require("@tamagui/font-inter/otf/Inter-Regular.otf"),
		InterThin: require("@tamagui/font-inter/otf/Inter-Thin.otf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<ConvexAuthProvider
			client={convex}
			storage={
				Platform.OS === "android" || Platform.OS === "ios"
					? secureStorage
					: undefined
			}
		>
			<QueryClientProvider client={queryClient}>
				<TamaguiProvider config={config} defaultTheme={currentTheme}>
					<ThemeProvider
						value={currentTheme === "dark" ? DarkTheme : DefaultTheme}
					>
						{/* <ToastProvider>
							<ToastViewport
								flexDirection="column-reverse"
								top={top}
								left={left}
								right={right}
							/> */}
						<GestureHandlerRootView style={{ flex: 1 }}>
							<StatusBar
								backgroundColor={
									currentTheme === "dark" ? "#090909" : "#FFFFFF"
								}
								style={currentTheme === "dark" ? "light" : "dark"}
							/>
							<Slot />
						</GestureHandlerRootView>
						{/* </ToastProvider> */}
					</ThemeProvider>
				</TamaguiProvider>
			</QueryClientProvider>
		</ConvexAuthProvider>
	);
}
