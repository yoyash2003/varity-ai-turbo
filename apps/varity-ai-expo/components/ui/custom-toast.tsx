import { AlertTriangle } from "@tamagui/lucide-icons";
import { Toast } from "@tamagui/toast";
import React from "react";
import { type FontTokens, XStack, YStack } from "tamagui";

export interface CustomToastProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	title?: string;
	description?: string;
}

export function CustomToast({
	open,
	setOpen,
	title,
	description,
}: CustomToastProps) {
	return (
		<YStack ai="center">
			<Toast
				onOpenChange={setOpen}
				open={open}
				animation="bouncy"
				enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
				exitStyle={{ opacity: 0, scale: 1, y: -20 }}
				y={0}
				x={0}
				opacity={1}
				scale={1}
				minWidth={225}
				backgroundColor="$color06"
				ai="center"
				jc="center"
				boxShadow="$color06"
				elevation={5}
			>
				<XStack ai="center" jc="center" gap={12}>
					<AlertTriangle size={24} color="$color2" />
					<YStack ai="center" jc="center" gap={8}>
						<Toast.Title
							fontFamily={"InterMedium" as FontTokens}
							fontSize={15}
							color="$color2"
						>
							{title}
						</Toast.Title>
						<Toast.Description
							fontFamily={"InterMedium" as FontTokens}
							fontSize={13}
							color="$color2"
						>
							{description}
						</Toast.Description>
					</YStack>
				</XStack>
			</Toast>
		</YStack>
	);
}
