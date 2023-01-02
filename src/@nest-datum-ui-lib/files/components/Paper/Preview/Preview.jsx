import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import utilsCheckStrMedia from '@nest-datum-ui/utils/check/str/media.js';
import utilsCheckStrPdf from '@nest-datum-ui/utils/check/str/pdf.js';
import utilsCheckStrEjs from '@nest-datum-ui/utils/check/str/ejs.js';
import utilsUrlFiles from '@nest-datum-ui/utils/url/files.js';

let Preview = ({ 
	wrapperRef,
	rendered, 
	id,
	src,
	name,
	size,
	loader,
	content,
}) => {
	const isMedia = React.useMemo(() => utilsCheckStrMedia(src), [
		src,
	]);
	const isPdf = React.useMemo(() => utilsCheckStrPdf(src), [
		src,
	]);
	const isEjs = React.useMemo(() => utilsCheckStrEjs(src), [
		src,
	]);

	return <React.Fragment>
		<Loader	visible={loader} />
		<Box
			sx={{
				display: loader
					? 'none'
					: 'block',
			}}>
			<Box
				{ ...wrapperRef
					? { ref: wrapperRef }
					: {} }
				maxWidth="240px"
				sx={{
					position: 'relative',
					...isMedia
						? {
							backgroundImage: `url('${rendered
								? src
								: utilsUrlFiles(src, true)}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}
						: {},
						'&:after': {
							content: '""',
							display: 'block',
							paddingBottom: isMedia
								? '100%'
								: '0px',
						},
					}}>
				{(() => {
					if (src) {
						switch (true) {
							case isPdf:
								return <a
									href={utilsUrlFiles(src, true)}
									target="_blank"
									rel="noreferrer">
									<PictureAsPdfIcon
										color="primary"
										style={{
											fontSize: '500%',
										}} />
								</a>;
							case isEjs:
								return <a
									href={utilsUrlFiles(src, true)}
									target="_blank"
									rel="noreferrer">
									<ViewQuiltIcon
										color="primary"
										style={{
											fontSize: '500%',
										}} />
								</a>;
							default:
								return isMedia
									? <React.Fragment />
									: <a
										href={utilsUrlFiles(src, true)}
										target="_blank"
										rel="noreferrer">
										<InsertDriveFileIcon
											style={{
												fontSize: '500%',
											}} />
									</a>;
						}
					}
					return <React.Fragment />;
				})()}
				{(typeof content === 'function')
					? content({
						id,
						src,
						name,
						size,
						isMedia,
					})
					: <React.Fragment />}
			</Box>
			{name
				? <Typography 
					component="div"
					variant="body2"
					sx={{
						wordWrap: 'anywhere',
					}}>
					<b>{name.length > 40
						? `${(name || '').substring(0, 40)}...`
						: name}</b>
				</Typography>
				: <React.Fragment />}
			{(typeof size === 'number')
				? <Typography
					component="div"
					variant="caption">
					Size: {size}
				</Typography>
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

Preview = React.memo(Preview);
Preview.defaultProps = {
};
Preview.propTypes = {
	loader: PropTypes.bool,
	rendered: PropTypes.bool,
	wrapperRef: PropTypes.object,
	src: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	size: PropTypes.number,
	content: PropTypes.func,
};

export default Preview;
