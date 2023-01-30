
const importSchema = ({
	'cv': async () => await import('@nest-datum-ui-lib/cv'),
	'forms': async () => await import('@nest-datum-ui-lib/forms'),
	'files': async () => await import('@nest-datum-ui-lib/files'),
	'logs': async () => await import('@nest-datum-ui-lib/logs'),
	'mail': async () => await import('@nest-datum-ui-lib/mail'),
	'data-type': async () => await import('@nest-datum-ui-lib/data-type'),
	'registry': async () => await import('@nest-datum-ui-lib/registry'),
	'http': async () => await import('@nest-datum-ui-lib/http'),
	'sso': async () => await import('@nest-datum-ui-lib/sso'),
	'lensa': async () => await import('@nest-datum-ui-lib/lensa'),
});

export default importSchema;
