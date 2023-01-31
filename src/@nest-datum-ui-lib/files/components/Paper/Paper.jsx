import React from 'react';
import PropTypes from 'prop-types';
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

let Paper = ({
	loader,
	path,
	name,
	size,
}) => {
	const isMedia = React.useMemo(() => utilsCheckStrMedia(path), [
		path,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(path), [
		path,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(path), [
		path,
	]);

	return <React.Fragment>
		<Loader	visible={loader} />
		<Box
			maxWidth="240px"
			sx={{
				position: 'relative',
				display: loader
					? 'none'
					: 'block',
				...isMedia
					? {
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundImage: `url('${utilsUrlFiles(path, true)}')`,
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
			{(() => {
				switch (true) {
					case isPdf:
						return <a
							href={utilsUrlFiles(path, true)}
							target="_blank"
							rel="noreferrer">
							<PictureAsPdfIcon color="primary" />
						</a>;
					case isEjs:
						return <a
							href={utilsUrlFiles(path, true)}
							target="_blank"
							rel="noreferrer">
							<ViewQuiltIcon color="primary" />
						</a>;
					case !isMedia:
						return <a
							href={utilsUrlFiles(path, true)}
							target="_blank"
							rel="noreferrer">
							<InsertDriveFileIcon />
						</a>;
					default:
						return <React.Fragment />;
				}
			})()}
		</Box>
		<Typography 
			component="div"
			variant="body2"
			sx={{
				wordWrap: 'anywhere',
				paddingLeft: '6px',
				paddingTop: '2px',
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
					paddingLeft: '6px',
					paddingBottom: '2px',
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
};

export default Paper;
