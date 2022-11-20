import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	body,
	html {
		margin: 0;
		padding: 0 !important;
		outline: none;
		display: block;
		height: 100%;
	}
	body {
		width: 100%;
		margin: 0 auto;
	}
	#root {
		position: relative;
		overflow-x: hidden;
		overflow-y: hidden;
		padding: 0px;
		height: 100%;
		max-height: 100%;
	}
	.ck.ck-editor__main {
		.ck-restricted-editing_mode_standard {
			min-height: 300px !important;
		}
	}
`;
