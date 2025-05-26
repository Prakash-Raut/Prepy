"use client";

import type React from "react";
import { useEffect, useState } from "react";

const AudioIndicator: React.FC = () => {
	const [levels, setLevels] = useState([0.3, 0.5, 0.7, 0.4, 0.2]);

	useEffect(() => {
		const interval = setInterval(() => {
			setLevels((prev) =>
				prev.map(() => Math.max(0.1, Math.min(0.9, Math.random()))),
			);
		}, 400);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center h-3 gap-[2px]">
			{levels.map((level) => (
				<div
					key={level * Math.random()}
					className="w-[3px] bg-green-400 rounded-full transition-all duration-300 ease-in-out"
					style={{ height: `${level * 100}%` }}
				/>
			))}
		</div>
	);
};

export default AudioIndicator;
