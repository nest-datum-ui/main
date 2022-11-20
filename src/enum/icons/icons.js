import React from 'react';

const all = {
	Code: React.lazy(() => import('@mui/icons-material/Code')),
	Tune: React.lazy(() => import('@mui/icons-material/Tune')),
	Create: React.lazy(() => import('@mui/icons-material/Create')),
	People: React.lazy(() => import('@mui/icons-material/People')),
	AutoStories: React.lazy(() => import('@mui/icons-material/AutoStories')),
	Folder: React.lazy(() => import('@mui/icons-material/Folder')),
	AutoFixHigh: React.lazy(() => import('@mui/icons-material/AutoFixHigh')),
	SnippetFolder: React.lazy(() => import('@mui/icons-material/SnippetFolder')),
	Dashboard: React.lazy(() => import('@mui/icons-material/Dashboard')),
};

const icons = (name) => all[name];

export default icons;
