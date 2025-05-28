export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			AIModelVersion: {
				Row: {
					id: string;
					modelName: string;
					version: string;
				};
				Insert: {
					id: string;
					modelName: string;
					version: string;
				};
				Update: {
					id?: string;
					modelName?: string;
					version?: string;
				};
				Relationships: [];
			};
			Feedback: {
				Row: {
					content: string;
					createdAt: string;
					id: string;
					improvements: string[] | null;
					interviewId: string;
					overallScore: number;
					strengths: string[] | null;
					updatedAt: string;
					userId: string;
				};
				Insert: {
					content: string;
					createdAt?: string;
					id: string;
					improvements?: string[] | null;
					interviewId: string;
					overallScore: number;
					strengths?: string[] | null;
					updatedAt?: string;
					userId: string;
				};
				Update: {
					content?: string;
					createdAt?: string;
					id?: string;
					improvements?: string[] | null;
					interviewId?: string;
					overallScore?: number;
					strengths?: string[] | null;
					updatedAt?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Feedback_interviewId_fkey";
						columns: ["interviewId"];
						isOneToOne: false;
						referencedRelation: "Interview";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "Feedback_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					},
				];
			};
			Interview: {
				Row: {
					aiModelVersionId: string | null;
					createdAt: string;
					durationMins: number;
					endedAt: string | null;
					id: string;
					interviewType: Database["public"]["Enums"]["InterviewType"];
					startedAt: string;
					status: Database["public"]["Enums"]["InterviewStatus"];
					updatedAt: string;
					userId: string;
				};
				Insert: {
					aiModelVersionId?: string | null;
					createdAt?: string;
					durationMins?: number;
					endedAt?: string | null;
					id: string;
					interviewType: Database["public"]["Enums"]["InterviewType"];
					startedAt?: string;
					status?: Database["public"]["Enums"]["InterviewStatus"];
					updatedAt?: string;
					userId: string;
				};
				Update: {
					aiModelVersionId?: string | null;
					createdAt?: string;
					durationMins?: number;
					endedAt?: string | null;
					id?: string;
					interviewType?: Database["public"]["Enums"]["InterviewType"];
					startedAt?: string;
					status?: Database["public"]["Enums"]["InterviewStatus"];
					updatedAt?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Interview_aiModelVersionId_fkey";
						columns: ["aiModelVersionId"];
						isOneToOne: false;
						referencedRelation: "AIModelVersion";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "Interview_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					},
				];
			};
			PredefinedInterview: {
				Row: {
					category: string;
					createdAt: string;
					description: string;
					difficulty: Database["public"]["Enums"]["Difficulty"];
					duration: number;
					id: string;
					title: string;
					updatedAt: string;
				};
				Insert: {
					category: string;
					createdAt?: string;
					description: string;
					difficulty: Database["public"]["Enums"]["Difficulty"];
					duration: number;
					id: string;
					title: string;
					updatedAt?: string;
				};
				Update: {
					category?: string;
					createdAt?: string;
					description?: string;
					difficulty?: Database["public"]["Enums"]["Difficulty"];
					duration?: number;
					id?: string;
					title?: string;
					updatedAt?: string;
				};
				Relationships: [];
			};
			Score: {
				Row: {
					createdAt: string;
					id: string;
					interviewId: string;
					updatedAt: string;
					userId: string;
					value: number;
				};
				Insert: {
					createdAt?: string;
					id: string;
					interviewId: string;
					updatedAt?: string;
					userId: string;
					value: number;
				};
				Update: {
					createdAt?: string;
					id?: string;
					interviewId?: string;
					updatedAt?: string;
					userId?: string;
					value?: number;
				};
				Relationships: [
					{
						foreignKeyName: "Score_interviewId_fkey";
						columns: ["interviewId"];
						isOneToOne: true;
						referencedRelation: "Interview";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "Score_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					},
				];
			};
			Transcript: {
				Row: {
					content: string;
					createdAt: string;
					id: string;
					interviewId: string;
					speaker: Database["public"]["Enums"]["Speaker"];
					updatedAt: string;
					userId: string;
				};
				Insert: {
					content: string;
					createdAt?: string;
					id: string;
					interviewId: string;
					speaker: Database["public"]["Enums"]["Speaker"];
					updatedAt?: string;
					userId: string;
				};
				Update: {
					content?: string;
					createdAt?: string;
					id?: string;
					interviewId?: string;
					speaker?: Database["public"]["Enums"]["Speaker"];
					updatedAt?: string;
					userId?: string;
				};
				Relationships: [
					{
						foreignKeyName: "Transcript_interviewId_fkey";
						columns: ["interviewId"];
						isOneToOne: false;
						referencedRelation: "Interview";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "Transcript_userId_fkey";
						columns: ["userId"];
						isOneToOne: false;
						referencedRelation: "User";
						referencedColumns: ["id"];
					},
				];
			};
			User: {
				Row: {
					createdAt: string;
					email: string;
					id: string;
					name: string | null;
					updatedAt: string;
				};
				Insert: {
					createdAt?: string;
					email: string;
					id: string;
					name?: string | null;
					updatedAt?: string;
				};
				Update: {
					createdAt?: string;
					email?: string;
					id?: string;
					name?: string | null;
					updatedAt?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			Difficulty: "EASY" | "MEDIUM" | "HARD";
			InterviewStatus: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
			InterviewType: "MIXED" | "TECHNICAL" | "BEHAVIORAL" | "SYSTEM_DESIGN";
			Speaker: "USER" | "AI";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {
			Difficulty: ["EASY", "MEDIUM", "HARD"],
			InterviewStatus: ["SCHEDULED", "IN_PROGRESS", "COMPLETED"],
			InterviewType: ["MIXED", "TECHNICAL", "BEHAVIORAL", "SYSTEM_DESIGN"],
			Speaker: ["USER", "AI"],
		},
	},
} as const;
