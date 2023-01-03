import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@nest-datum-ui/components/Dialog';
import FilesPaperManage from '@nest-datum-ui-lib/files/components/Paper/Manage';
import Store from '@nest-datum-ui/components/Store';

let ListMemo = ({
	id,
	selectSeveral,
	onChange,
	...props
}) => {
	const loader = useSelector(selectorMainExtract([ 'api', 'list', 'filesSystemSelect', 'loader' ]));
	const checkedLength = useSelector(selectorMainExtract([ 'api', 'list', 'filesSystemSelect', 'checked', 'length' ]));
	const onHandle = React.useCallback(async (e) => {
		e.preventDefault();

		const checkedArr = Store()
			.getState()['api']
			.list['filesSystemSelect']
			.checked || [];

		onChange({
			target: {
				value: selectSeveral
					? checkedArr
					: checkedArr[0],
			},
			currentTarget: {
				value: checkedArr
					? checkedArr
					: checkedArr[0],
			},
		});
		actionDialogClose(id)();
	}, [
		onChange,
		selectSeveral,
		id,
	]);
	const onClose = React.useCallback((e) => {
		actionDialogClose(id)();
	}, [
		id,
	]);
	const onSelectFolder = React.useCallback((folder) => {
	}, [
	]);
	const onSelectFile = React.useCallback((file) => {
	}, [
	]);

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
					selectSeveral={selectSeveral}
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
	React.useEffect(() => () => {
		mounted = false;
	}, []);

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
	selectSeveral: false,
	onChange: (() => {}),
};
List.propTypes = {
	selectSeveral: PropTypes.bool,
	onChange: PropTypes.func,
};

export default List;