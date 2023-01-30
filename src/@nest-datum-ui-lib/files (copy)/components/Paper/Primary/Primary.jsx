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
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';

let PrimaryMemo = ({
	wrapperRef,
	rendered,
	id,
	content,
	disableTitle,
	disableSize,
	navigate,
	enqueueSnackbar,
	...props
}) => {
	const fetchedFileLoader = useSelector(selectorMainExtract([ 'api', 'form', id, 'loader' ]));
	const fetchedFileSystemId = useSelector(selectorMainExtract([ 'api', 'form', id, 'systemId' ]));
	const [ fileState, setFileState ] = React.useState(() => ({
		id,
		src: '',
	}));

	React.useEffect(() => {
		if (id
			&& !fetchedFileSystemId) {
			actionApiFormGet({
				entityId: id,
				url: process.env.SERVICE_FILES,
				path: 'file',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		id,
		fetchedFileSystemId,
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
			content,
			disableTitle,
			disableSize,
			...props
		}, fileState)
		: <React.Fragment>
			<div>
				{fileState['src']
					? <React.Fragment>
						<FilesPaperPreview 
							wrapperRef={wrapperRef}
							rendered={rendered}
							disableTitle={disableTitle}
							disableSize={disableSize}
							id={fileState['id']}
							path={fileState['path']}
							src={fileState['src']}
							name={fileState['name']}
							size={fileState['size']}
							loader={(typeof fetchedFileLoader === 'undefined')} />
					</React.Fragment>
					: <React.Fragment />}
			</div>
		</React.Fragment>;
};

PrimaryMemo = React.memo(PrimaryMemo);
PrimaryMemo.defaultProps = {
};

let Primary = ({
	id,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const [ idMemo, setIdMemo ] = React.useState(() => id);
	const [ updater, setUpdater ] = React.useState(() => undefined);
	const [ enqueueSnackbarMemo ] = React.useState(() => enqueueSnackbar);
	const [ navigateMemo ] = React.useState(() => navigate);

	React.useEffect(() => {
		if (id) {
			setUpdater(true);
		}
	}, [
		id,
		setUpdater,
	]);

	React.useEffect(() => {
		if (id
			&& updater) {
			setIdMemo(() => {
				setTimeout(() => setUpdater(false), 0);

				return id;
			});
		}
	}, [
		updater,
		id,
		setUpdater,
		setIdMemo,
	]);

	return (updater === false
		&& idMemo)
		? <PrimaryMemo
			navigate={navigateMemo}
			enqueueSnackbar={enqueueSnackbarMemo}
			id={idMemo}
			{ ...props } />
		: ((!id && updater === undefined)
			? <PrimaryMemo
				navigate={navigateMemo}
				enqueueSnackbar={enqueueSnackbarMemo}
				{ ...props } />
			: <React.Fragment />);
};

Primary = React.memo(Primary);
Primary.defaultProps = {
	disableTitle: false,
	disableSize: false,
};
Primary.propTypes = {
	id: PropTypes.string.isRequired,
	rendered: PropTypes.bool,
	disableTitle: PropTypes.bool,
	disableSize: PropTypes.bool,
	content: PropTypes.func,
};

export default Primary;
