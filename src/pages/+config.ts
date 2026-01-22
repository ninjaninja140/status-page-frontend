import vikeReact from 'vike-react/config';
import type { Config } from 'vike/types';

// Default config (can be overridden by pages)
// https://vike.dev/config
export default {
	prerender: true,

	// https://vike.dev/head-tags
	title: 'My new Website!',

	extends: [vikeReact],
} as Config;
