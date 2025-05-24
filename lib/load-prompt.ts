"use server";

import fs from "node:fs";
import path from "node:path";

let cachedPrompt: string | null = null;

export async function getSystemPrompt(): Promise<string> {
	if (!cachedPrompt) {
		const promptPath = path.join(process.cwd(), "prompts/system-prompt.txt");
		cachedPrompt = await fs.promises.readFile(promptPath, "utf-8");
	}
	return cachedPrompt;
}
