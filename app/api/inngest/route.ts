import { inngest } from "@/inngest/client";
import { interviewProcessing } from "@/inngest/function";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
	client: inngest,
	functions: [interviewProcessing],
});
