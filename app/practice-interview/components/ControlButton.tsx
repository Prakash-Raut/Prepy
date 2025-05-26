"use client";

import type React from "react";

interface ControlButtonProps {
	onClick: () => void;
	active: boolean;
	activeIcon: React.ReactNode;
	inactiveIcon: React.ReactNode;
	label: string;
	activeColor: string;
	inactiveColor: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({
	onClick,
	active,
	activeIcon,
	inactiveIcon,
	label,
	activeColor,
	inactiveColor,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`
        relative rounded-full p-3 transition-all duration-200
        ${active ? activeColor : inactiveColor}
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
			aria-label={label}
			title={label}
		>
			{active ? activeIcon : inactiveIcon}
		</button>
	);
};

export default ControlButton;
