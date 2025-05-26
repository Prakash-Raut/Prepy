export type ChildrenProps = {
	children: React.ReactNode;
};

export type OpenAIRealtimeEvent = {
	type: string;
	event_id?: string;
	response?: {
		output?: Array<{
			type: string;
			content?: Array<{
				type: string;
				transcript?: string;
				text?: string;
			}>;
		}>;
	};
	delta?: {
		transcript?: string;
		text?: string;
	};
	item?: {
		type: string;
		content?: Array<{
			type: string;
			transcript?: string;
			text?: string;
		}>;
	};
};
