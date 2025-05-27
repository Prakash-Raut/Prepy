"use client";
import type { HTMLMotionProps } from "framer-motion";
import dynamic from "next/dynamic";

export const MotionDiv = dynamic(
	() => import("framer-motion").then((mod) => mod.motion.div),
	{ ssr: false },
) as React.ComponentType<HTMLMotionProps<"div">>;

export const MotionH2 = dynamic(
	() => import("framer-motion").then((mod) => mod.motion.h2),
	{ ssr: false },
) as React.ComponentType<HTMLMotionProps<"h2">>;

export const MotionP = dynamic(
	() => import("framer-motion").then((mod) => mod.motion.p),
	{ ssr: false },
) as React.ComponentType<HTMLMotionProps<"p">>;
