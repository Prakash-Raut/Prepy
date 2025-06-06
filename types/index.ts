export type ChildrenProps = {
	children: React.ReactNode;
};

export type Interview = {
	id: string;
	title: string;
	description: string;
	difficulty: "easy" | "medium" | "hard";
	duration: number;
};
