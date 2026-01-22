import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

import '../index.css';

export default function Wrapper({ children }: { children: React.ReactNode }) {
	const pageContext = usePageContext();

	useEffect(() => {
		document.title = `${pageContext.config.title} — My Website`;
	});

	return children;
}
