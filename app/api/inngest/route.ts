import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { interviewProcessing } from "@/inngest/function";

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [interviewProcessing],
});
