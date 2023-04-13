import { createAppContext } from '@nest-datum-ui/Context';
import sso from '@nest-datum-ui-admin-lib/sso/src/config';
import dataType from '@nest-datum-ui-admin-lib/data-type/src/config';
import files from '@nest-datum-ui-admin-lib/files/src/config';
import http from '@nest-datum-ui-admin-lib/http/src/config';
import webSocket from '@nest-datum-ui-admin-lib/web-socket/src/config';
import mail from '@nest-datum-ui-admin-lib/mail/src/config';
import forms from '@nest-datum-ui-admin-lib/forms/src/config';
import cv from '@nest-datum-ui-admin-lib/cv/src/config';
import lensa from '@nest-datum-ui-admin-lib/lensa/src/config';
import dictionary from '@nest-datum-ui-admin-lib/dictionary/src/config';
import countries from '@nest-datum-ui-admin-lib/countries/src/config';
import jobs from '@nest-datum-ui-admin-lib/jobs/src/config';
import johnConnor from '@nest-datum-ui-admin-lib/john-connor/src/config';

const importSchema = {
	'data-type': createAppContext(dataType),
	'sso': createAppContext(sso),
	'files': createAppContext(files),
	'http': createAppContext(http),
	'web-socket': createAppContext(webSocket),
	'mail': createAppContext(mail),
	'forms': createAppContext(forms),
	'cv': createAppContext(cv),
	'lensa': createAppContext(lensa),
	'dictionary': createAppContext(dictionary),
	'countries': createAppContext(countries),
	'jobs': createAppContext(jobs),
	'john-connor': createAppContext(johnConnor),
};

export default importSchema;
