"use client";

import {
	type LiveClient,
	type LiveSchema,
	type LiveTranscriptionEvent,
	LiveTranscriptionEvents,
	createClient,
} from "@deepgram/sdk";

import {
	type FunctionComponent,
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";

interface DeepgramContextType {
	connection: LiveClient | null;
	connectToDeepgram: (options: LiveSchema, endpoint?: string) => Promise<void>;
	disconnectFromDeepgram: () => void;
}

const DeepgramContext = createContext<DeepgramContextType | undefined>(
	undefined,
);

interface DeepgramContextProviderProps {
	children: ReactNode;
}

const getApiKey = async (): Promise<string> => {
	const response = await fetch("/api/authenticate");
	const result = await response.json();
	return result.key;
};

const DeepgramContextProvider: FunctionComponent<
	DeepgramContextProviderProps
> = ({ children }) => {
	const [connection, setConnection] = useState<LiveClient | null>(null);

	/**
	 * Connects to the Deepgram speech recognition service and sets up a live transcription session.
	 *
	 * @param options - The configuration options for the live transcription session.
	 * @param endpoint - The optional endpoint URL for the Deepgram service.
	 * @returns A Promise that resolves when the connection is established.
	 */
	const connectToDeepgram = useCallback(
		async (options: LiveSchema, endpoint?: string) => {
			const key = await getApiKey();
			const deepgram = createClient(key);
			const conn = deepgram.listen.live(options, endpoint);
			setConnection(conn);
		},
		[],
	);

	const disconnectFromDeepgram = useCallback(() => {
		if (connection) {
			connection.requestClose();
			setConnection(null);
		}
	}, [connection]);

	return (
		<DeepgramContext.Provider
			value={{
				connection,
				connectToDeepgram,
				disconnectFromDeepgram,
			}}
		>
			{children}
		</DeepgramContext.Provider>
	);
};

function useDeepgram(): DeepgramContextType {
	const context = useContext(DeepgramContext);
	if (context === undefined) {
		throw new Error(
			"useDeepgram must be used within a DeepgramContextProvider",
		);
	}
	return context;
}

export {
	DeepgramContextProvider,
	LiveTranscriptionEvents,
	useDeepgram,
	type LiveTranscriptionEvent,
};
