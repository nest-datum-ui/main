import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireFormDrop as actionApiFromDrop } from '@nest-datum-ui/components/Store/api/actions/form/drop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';

let Drop = ({
	id,
	storeName,
	withAccessToken,
	url,
	path,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const entityId = useSelector(selectorMainExtract([ 'dialog', id, 'entityId' ]));
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const onDrop = React.useCallback(async (e) => {
		await actionApiFromDrop({
			entityId,
			storeName,
			withAccessToken,
			url,
			path,
		})(enqueueSnackbar);
		await actionDialogClose(id)();
	}, [
		id,
		storeName,
		withAccessToken,
		url,
		path,
		entityId,
		enqueueSnackbar,
	]);
	const loader = formLoader === true || listLoader === true;

	return <React.Fragment>
		<Dialog 
			{ ...props }
			loader={loader}
			maxWidth="xs"
			id={id}
			title="Remove option?"
			actions={<React.Fragment>
				<Button
					disabled={loader}
					disableElevation
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onDrop}>
					OK
				</Button>
			</React.Fragment>}>
			<DialogContentText>
				Are you sure you want to remove the current option? This operation is irreversible and may compromise data integrity.
			</DialogContentText>
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	id: 'optionDrop',
};
Drop.propTypes = {
	storeName: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default Drop;