import { hookNavigate } from '@nest-datum-ui/utils/hooks';

const switchLink = (e) => {
	e.preventDefault();

	const navigate = hookNavigate();
	const pathname = e.currentTarget.pathname;

	window.dispatchEvent(new CustomEvent('onBreadcrumbsChange', { 
		detail: {
			pathname,
		}, 
	}));
	navigate(pathname);
};

export default switchLink;
