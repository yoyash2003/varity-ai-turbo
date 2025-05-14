import { useAuthActions } from "@convex-dev/auth/react";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";
import { Button, Platform, View } from "react-native";

const redirectTo = makeRedirectUri();

function SignIn() {
	const { signIn } = useAuthActions();
	const handleSignIn = async () => {
		const { redirect } = await signIn("google", { redirectTo });
		if (Platform.OS === "web") {
			return;
		}
		if (!redirect) {
			return;
		}
		const result = await openAuthSessionAsync(redirect.toString(), redirectTo);
		if (result.type === "success") {
			const { url } = result;
			const code = new URL(url).searchParams.get("code");
			if (!code) {
				return;
			}
			await signIn("google", { code });
		}
	};
	return <Button onPress={handleSignIn} title="Sign in with Google" />;
}

export default function OnboardingScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<SignIn />
		</View>
	);
}
