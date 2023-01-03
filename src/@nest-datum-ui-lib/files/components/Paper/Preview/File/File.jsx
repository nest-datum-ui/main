import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireOpen as actionMenuOpen } from '@nest-datum-ui/components/Store/menu/actions/open.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilesPaperPreview from '@nest-datum-ui-lib/files/components/Paper/Preview';
import MenuFileContext from '@nest-datum-ui-lib/files/components/Menu/File/Context';
import Store from '@nest-datum-ui/components/Store';

let File = ({
	path,
	name,
	size,
	id,
	isDeleted,
	isNotDelete,
	menu,
	selectSeveral,
	onSelectFile,
}) => {
	const currentChecked = useSelector(selectorFindArray([ 'api', 'list', 'filesSystemSelect', 'checked' ], (item) => item === id));
	const onClick = React.useCallback((id, name) => (e) => {
		let checkedArr = (Store()
			.getState()['api']
			.list['filesSystemSelect'] || {})
			.checked || [];
		const currentIndex = selectSeveral
			? checkedArr.indexOf(id)
			: (checkedArr.length === 1)
				? 0
				: -1;
		const currentSelectedFlag = id === checkedArr[currentIndex];

		if (currentIndex >= 0) {
			checkedArr.splice(currentIndex, 1);
		}
		if (!selectSeveral
			&& !currentSelectedFlag) {
			checkedArr.push(id);
		}
		actionApiListProp('filesSystemSelect', 'checked', [ ...checkedArr ])();

		if (typeof onSelectFile === 'function') {
			onSelectFile(e, {
				id,
				name,
			});
		}
	}, [
		onSelectFile,
		selectSeveral,
	]);
	const onMenu = React.useCallback((itemId) => (e) => {
		actionMenuOpen(`files-menu-file-context-${itemId}`, e.target)();
	}, [
	]);

	return <React.Fragment>
		<Grid
			item
			xs={2}>
			<Grid
				container
				spacing={1}>
				<Grid
					item
					xs={true}>
					<Button
						component="div"
						color="inherit"
						onClick={onClick(id, name)}
						sx={{
							position: 'relative',
							display: 'block',
							width: '100%',
							height: '100%',
							backgroundColor: '#f7f7f7',
							padding: '0px',
							textTransform: 'initial',
						}}>
						<FilesPaperPreview 
							listing
							path={path}
							src={path}
							name={name}
							size={size}
							id={id}
							content={() => (typeof onSelectFile === 'function')
								? <Box
									sx={{
										position: 'absolute',
										bottom: '6px',
										left: '6px',
										backgroundColor: `rgba(255, 255, 255, 0.7)`,
										borderRadius: '6px',
									}}>
									<Checkbox
										checked={!!currentChecked}
										sx={{
											padding: '2px',
										}} />
								</Box>
								: <React.Fragment />} />
					</Button>
				</Grid>
				{menu
					? <Grid
						item
						xs={false}>
						<IconButton
							size="small"
							onClick={onMenu(id)}>
							<MoreVertIcon fontSize="small" />
						</IconButton>
						<MenuFileContext 
							id={`files-menu-file-context-${id}`}
							entityId={id}
							isDeleted={isDeleted}
							isNotDelete={isNotDelete} />
					</Grid>
					: <React.Fragment />}
			</Grid>
		</Grid>
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
	selectSeveral: false,
};
File.propTypes = {
	path: PropTypes.string,
	name: PropTypes.string,
	size: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	id: PropTypes.string,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	menu: PropTypes.bool,
	selectSeveral: PropTypes.bool,
	onSelectFile: PropTypes.func,
};

export default File;
