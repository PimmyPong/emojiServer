import emojis from "@/app/lib/emoji.js";
import { NextResponse } from "next/server.js";

export function GET(request, response) {
	const { emojiId } = response.params;
	const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
	if (!emoji) {
		return NextResponse.json({
			success: false,
			emoji: "No emoji with that ID found",
		});
	}
	return NextResponse.json({ success: true, emoji });
}

export function PUT(request, response) {
	const { emojiId } = response.params;
	try {
		const emojiIndex = emojis.findIndex((emoji) => emoji.id === +emojiId);
		if (emojiIndex !== -1) {
			(emojis[emojiIndex].name = "Update emoji name") &&
			(emojis[emojiIndex].character = "Update emoji character");
			return NextResponse.json({
				success: true,
				emoji: emojis[emojiIndex],
			});
		} else {
			return NextResponse.json({ success: false, error: "Emoji not found" });
		}
	} catch (error) {
		return NextResponse.json({ success: false, error: "No route found." });
	}
}

export function DELETE(request, response) {
	try {
		const { emojiId } = response.params;
		const emojiIndex = emojis.findIndex((emoji) => emoji.id === +emojiId);
		if (emojiIndex === -1) {
			return NextResponse.json({
				success: false,
				error: " Delete not success, No emoji found",
			});
		}
        
		emojis.splice(emojiIndex, 1);
		return NextResponse.json({
			success: true,
			message: "Delete successful",
		});
	} catch (error) {
		return NextResponse.json({ success: false, error: "No route found." });
	}
}

// bc we use [ emoji] we use .params
// params = objs with key n value
