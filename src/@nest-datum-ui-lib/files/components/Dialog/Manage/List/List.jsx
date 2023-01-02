import React from 'react';
import { useSelector } from 'react-redux';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';
import FilesPaperManage from '@nest-datum-ui-lib/files/components/Paper/Manage';

let ListMemo = ({
	id,
	...props
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'list', 'filesSystemSelect', 'loader' ]));
	const checkedLength = useSelector(selectorMainExtract([ 'api', 'list', 'filesSystemSelect', 'checked', 'length' ]));
	const onHandle = React.useCallback(async (e) => {
		e.preventDefault();
	}, [
	]);
	const onClose = React.useCallback((e) => {
		actionDialogClose(id)();
	}, [
		id,
	]);
	const onSelectFolder = React.useCallback((folder) => {
		// console.log('onSelectFolder', folder);
	}, [
	]);
	const onSelectFile = React.useCallback((file) => {
		// console.log('onSelectFile', file);
	}, [
	]);

	console.log('checkedLength', id, checkedLength);

	return <React.Fragment>
		<Dialog 
			{ ...props }
			onClose={onClose}
			loader={loader}
			maxWidth="md"
			id={id}
			title={<React.Fragment>
				Select file
			</React.Fragment>}
			actions={<React.Fragment>
				<Button
					disabled={loader || !checkedLength}
					disableElevation
					variant="contained"
					startIcon={<CheckIcon />}
					onClick={onHandle}>
					OK
				</Button>
			</React.Fragment>}>
			<React.Fragment>
				<FilesPaperManage
					filters
					search
					onSelectFolder={onSelectFolder}
					onSelectFile={onSelectFile}
					selectSystemWrapperProps={{
						lg: 3,
					}} />
			</React.Fragment>
		</Dialog>
	</React.Fragment>;
};

ListMemo = React.memo(ListMemo);
ListMemo.defaultProps = {
};
ListMemo.propTypes = {
};

let mounted = false;
let List = (props) => {
	return mounted
		? <React.Fragment />
		: (() => {
			mounted = true;

			return <ListMemo { ...props } />;
		})();
};

List = React.memo(List);
List.defaultProps = {
	id: 'filesManageList',
};
List.propTypes = {
};

export default List;