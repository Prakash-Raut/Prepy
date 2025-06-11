import { createInterview } from "./actions/interview";

const newInterview = await createInterview(
	{
		name: "Technical Interview",
		agentId: "RD3UxvBHuqK1YLJsWc40R",
	},
	"d6pLfR7ygLaFeZkWWYBSR2iY9CXjfhJ1",
);

console.log(newInterview);
