import posthog from "posthog-js";

export const trackEvent = (
	event: string,
	properties: Record<string, any> = {},
) => {
	posthog.capture(event, properties);
};

export const identifyUser = (id: string, traits: Record<string, any> = {}) => {
	posthog.identify(id, traits);
};
