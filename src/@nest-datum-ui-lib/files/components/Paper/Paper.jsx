import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckFunc from '@nest-datum-ui/utils/check/func';
import utilsCheckStrMedia from '@nest-datum-ui/utils/check/str/media.js';
import utilsCheckStrPdf from '@nest-datum-ui/utils/check/str/pdf.js';
import utilsCheckStrEjs from '@nest-datum-ui/utils/check/str/ejs.js';
import utilsUrlFiles from '@nest-datum-ui/utils/url/files.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import Loader from '@nest-datum-ui/components/Loader';
import Preview from './Preview';

let Paper = ({
	loader,
	id,
	isDeleted,
	isNotDelete,
	path,
	name,
	size,
	onClick,
}) => {
	const accessToken = useSelector(selectorMainExtract([ 'auth', 'accessToken' ]));
	const isMedia = React.useMemo(() => utilsCheckStrMedia(path), [
		path,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(path), [
		path,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(path), [
		path,
	]);
	const onHandle = React.useCallback((e) => {
		onClick(e, {
			id,
			isDeleted,
			isNotDelete,
			path,
			name,
			size,
		});
	}, [
		onClick,
		id,
		isDeleted,
		isNotDelete,
		path,
		name,
		size,
	]);

	return <React.Fragment>
		<Loader	visible={loader} />
		<Box
			maxWidth="240px"
			{ ...utilsCheckFunc(onClick)
				? { onClick: onHandle }
				: {} }
			sx={{
				position: 'relative',
				display: loader
					? 'none'
					: 'block',
				...utilsCheckFunc(onClick)
					? {
						cursor: 'pointer',
					}
					: {},
				...isMedia
					? {
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundImage: `url('${utilsUrlFiles(path, true, accessToken)}')`,
					}
					: {},
				'&:after': {
					content: '""',
					display: 'block',
					paddingBottom: isMedia
						? '100%'
						: '0px',
				},
				'& > a': {
					display: 'block',
					width: '100%',
					'& > svg': {
						width: '100%',
						height: '100%',
					},
				},
			}}>
			{utilsCheckFunc(onClick)
				? <Preview value={path} />
				: <a
					href={utilsUrlFiles(path, true)}
					target="_blank"
					rel="noreferrer">
					<Preview value={path} />
				</a>}
		</Box>
		<Typography 
			component="div"
			variant="caption"
			color={isDeleted
				? 'textSecondary'
				: 'initial'}
			sx={{
				wordWrap: 'anywhere',
				paddingTop: '2px',
				wordBreak: 'break-all',
				textDecoration: isDeleted
					? 'line-through'
					: 'initial',
			}}>
			<b>{name
				? (name.length > 80
					? `${(name || '').substring(0, 80)}...`
					: name)
				: ((path || '').length > 80
					? `${(path || '').substring(0, 80)}...`
					: path)}</b>
		</Typography>
		{(typeof size === 'number')
			&& <Typography
				component="div"
				variant="caption"
				sx={{
					paddingBottom: '2px',
					fontSize: '10px',
				}}>
				Size: {size}
			</Typography>}
	</React.Fragment>;
};

Paper = React.memo(Paper);
Paper.defaultProps = {
};
Paper.propTypes = {
	loader: PropTypes.bool,
	name: PropTypes.string,
	path: PropTypes.string,
	size: PropTypes.number,
	onClick: PropTypes.func,
	withSelect: PropTypes.bool,
};

export default Paper;
