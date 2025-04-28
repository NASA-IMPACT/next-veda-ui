import React, { useState, createContext, ReactNode } from 'react';

type TransparentHeaderContextState = { isTransparentHeader: boolean, setTransparentHeader: (value: boolean) => void }

export const TransparentHeaderContext = createContext<TransparentHeaderContextState>({
	isTransparentHeader: false,
	setTransparentHeader: () => {},
});

export const TransparentHeaderProvider = ({children}: {children: ReactNode}): any => {
  const [isTransparentHeader, setTransparentHeader] = useState<boolean>(false);
	return (
		<TransparentHeaderContext.Provider value={{ isTransparentHeader, setTransparentHeader }}>
			{children}
		</TransparentHeaderContext.Provider>
	);
}
