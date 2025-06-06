"use server";

import { QueryClient } from "@tanstack/react-query";

/**
 * Returns a new QueryClient instance for each request.
 * This is required to prevent state leaks between requests on the server.
 */
export async function getQueryClient() {
	return new QueryClient();
}
