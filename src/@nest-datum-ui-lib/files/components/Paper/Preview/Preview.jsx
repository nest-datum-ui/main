import React from 'react';
import PropTypes from 'prop-types';
import utilsCheckStrMedia from '@nest-datum-ui/utils/check/str/media.js';
import utilsCheckStrPdf from '@nest-datum-ui/utils/check/str/pdf.js';
import utilsCheckStrEjs from '@nest-datum-ui/utils/check/str/ejs.js';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

let Preview = ({ 
	value,
	isDeleted, 
}) => {
	const isMedia = React.useMemo(() => utilsCheckStrMedia(value), [
		value,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(value), [
		value,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(value), [
		value,
	]);

	switch (true) {
		case isPdf:
			return <PictureAsPdfIcon
				style={{
					width: '100%',
					height: '100%',
				}}
				color={isDeleted
					? 'disabled'
					: 'primary'} />;
		case isEjs:
			return <ViewQuiltIcon
				style={{
					width: '100%',
					height: '100%',
				}}
				color={isDeleted
					? 'disabled'
					: 'primary'} />
		case !isMedia:
			return <InsertDriveFileIcon
				style={{
					width: '100%',
					height: '100%',
				}}
				color={isDeleted
					? 'disabled'
					: 'primary'} />
		default:
			return <React.Fragment />;
	}
};

Preview = React.memo(Preview);
Preview.defaultProps = {
};
Preview.propTypes = {
	value: PropTypes.string,
	isDeleted: PropTypes.bool,
};

export default Preview;
