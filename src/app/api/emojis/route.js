import emojis from "@/app/lib/emoji.js";
import { NextResponse } from "next/server.js";

export function GET() {
	return NextResponse.json({ success: true, emojis });
}

export async function POST(request, response) {
	//access the json client sent in the body of their request?
	try {
		const { name, character } = await request.json();
		if (!name || !character) {
			return NextResponse.json({
				success: false,
				error: "You must provide a name and character to create emoji",
			});
		}
		const emoji = { id: emojis.length + 1, name, character };
		emojis.push(emoji);

		return NextResponse.json({ success: true, emojis });
	} catch (error) {
		return NextResponse.json({ success: false, error: "No route found." });
	}
}
