"use client";

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const data = [
	{ month: "Jan", score: 6.5, interviews: 2 },
	{ month: "Feb", score: 7.2, interviews: 3 },
	{ month: "Mar", score: 7.8, interviews: 4 },
	{ month: "Apr", score: 8.1, interviews: 3 },
	{ month: "May", score: 8.4, interviews: 5 },
	{ month: "Jun", score: 8.7, interviews: 4 },
];

export function PerformanceChart() {
	return (
		<div className="h-[300px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						className="stroke-slate-200 dark:stroke-slate-700"
					/>
					<XAxis
						dataKey="month"
						className="text-slate-600 dark:text-slate-400"
						fontSize={12}
					/>
					<YAxis
						domain={[0, 10]}
						className="text-slate-600 dark:text-slate-400"
						fontSize={12}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "hsl(var(--background))",
							border: "1px solid hsl(var(--border))",
							borderRadius: "8px",
						}}
						labelStyle={{ color: "hsl(var(--foreground))" }}
					/>
					<Line
						type="monotone"
						dataKey="score"
						stroke="#8b5cf6"
						strokeWidth={3}
						dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
