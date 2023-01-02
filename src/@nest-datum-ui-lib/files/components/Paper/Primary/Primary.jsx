import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireNext as actionQueueNext } from '@nest-datum-ui/components/Store/queue/actions/next.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import FilesPaperPreview from '@nest-datum-ui-lib/files/components/Paper/Preview';
import Store from '@nest-datum-ui/components/Store';
import Queue from '@nest-datum-ui/components/Queue';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';

let PrimaryMemo = ({
	id,
	unmount,
	loadAllow,
	content,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const fetchedFileLoader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const fetchedFileSystemId = useSelector(selectorMainExtract([ 'api', 'form', id, 'systemId' ]));
	const [ fileState, setFileState ] = React.useState(() => ({
		id,
		src: '',
	}));

	React.useEffect(() => {
		if (loadAllow) {
			actionApiFormGet({
				entityId: id,
				url: process.env.SERVICE_FILES,
				path: 'file',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		loadAllow,
		id,
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => {
		if (id 
			&& fetchedFileSystemId) {
			const fileData = Store()
				.getState()['api']
				.form[id];
			if (utilsCheckObj(fileData)) {
				setFileState((currentState) => {
					setTimeout(() => actionQueueNext(`filesPaperPrimary`)(), 0);

					return {
						...setFileState,
						systemId: fileData['systemId'],
						src: fileData['path'],
						path: fileData['path'],
						name: fileData['name'],
						size: fileData['size'],
						type: fileData['type'],
					};
				});
			}
		}
	}, [
		id,
		fetchedFileSystemId,
		setFileState,
	]);

	return (typeof content === 'function')
		? content({
			id,
			unmount,
			loadAllow,
			content,
			...props
		}, fileState, setFileState)
		: <React.Fragment>
			<div>
				{fileState['src']
					? <React.Fragment>
						<FilesPaperPreview 
							id={fileState['id']}
							src={fileState['src']}
							name={fileState['name']}
							size={fileState['size']}
							loader={(typeof fetchedFileLoader === 'undefined' || unmount)} />
					</React.Fragment>
					: <React.Fragment />}
			</div>
		</React.Fragment>;
};

PrimaryMemo = React.memo(Queue('filesPaperPrimary', PrimaryMemo));
PrimaryMemo.defaultProps = {
};

let Primary = ({
	id,
	...props
}) => {
	const [ idMemo ] = React.useState(() => id);

	return <PrimaryMemo
		id={idMemo}
		{ ...props } />;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
	id: PropTypes.string.isRequired,
	content: PropTypes.func,
};

export default Primary;
