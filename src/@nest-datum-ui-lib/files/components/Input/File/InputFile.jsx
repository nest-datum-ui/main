import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorFindArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SelectSystem from '@nest-datum-ui-lib/files/components/Select/System';

let InputFile = ({ 
	name,
	label, 
	helperText,
	value,
	defaultValue,
	onChange,
	disabled,
}) => {
	const imageBoxRef = React.useRef();
	const [ loaclValue, setLocalValue ] = React.useState(() => (value
		&& typeof value === 'object'
		&& value['src']
		&& typeof value['src'] === 'string'
		&& value['systemId']
		&& typeof value['systemId'] === 'string')
		? value
		: ((defaultValue
			&& typeof defaultValue === 'object'
			&& defaultValue['src']
			&& typeof defaultValue['src'] === 'string'
			&& defaultValue['systemId']
			&& typeof defaultValue['systemId'] === 'string')
			? defaultValue
			: ({
				src: '',
				systemId: '',
				id: `input-file-${name}`,
			})));
	const [ updateFlag, setUpdateFlag ] = React.useState(() => false);
	const system = useSelector(selectorFindArray([ 'api', 'list', 'filesSystemSelect', 'data' ], (item) => item['id'] === loaclValue['systemId']));
	const systemOptionPath = ((system || {})['systemSystemOptions'] || []).find((item) => item['systemOptionId'] === 'files-system-option-root');
	const systemOptionContentPath = ((system || [])['systemSystemSystemOptions'] || []).find((item) => item['systemSystemOptionId'] === (systemOptionPath || {})['id']);
	const systemPath = (systemOptionContentPath || {})['content'];
	const onChangeSystemId = React.useCallback((e) => {
		setLocalValue((currentState) => ({ 
			...currentState,
			systemId: e.target.value, 
			errorSystemId: '', 
			src: '',
		}));
	}, [
		setLocalValue,
	]);
	const onFile = React.useCallback((e) => {
		const reader = new FileReader();
		const files = e.target.files;

		reader.readAsDataURL(e.target.files[0]);
		reader.addEventListener('load', (e) => {
			setLocalValue((currentState) => {
				const newState = {
					...currentState,
					src: e.target.result,
					path: systemPath,
				};

				onChange({
					target: {
						value: newState,
						currentValue: newState,
						files,
					},
				});
				((imageBoxRef.current || {}).style || {})['backgroundImage'] = `url(${e.target.result})`;

				return newState;
			});
			setUpdateFlag(true);
		});
	}, [
		onChange,
		setLocalValue,
		imageBoxRef,
		systemPath,
	]);
	const isImage = loaclValue['src']
		&& ((() => {
				const valueSplit = loaclValue['src'].split('.');

				return valueSplit[valueSplit.length - 1] === 'png'
					|| valueSplit[valueSplit.length - 1] === 'jpeg'
					|| valueSplit[valueSplit.length - 1] === 'jpg'
					|| valueSplit[valueSplit.length - 1] === 'svg'
					|| valueSplit[valueSplit.length - 1] === 'gif';
			})()
			|| loaclValue['src'].indexOf('data:image/png;base64') === 0
			|| loaclValue['src'].indexOf('data:image/jpeg;base64') === 0
			|| loaclValue['src'].indexOf('data:image/jpg;base64') === 0
			|| loaclValue['src'].indexOf('data:image/svg;base64') === 0
			|| loaclValue['src'].indexOf('data:image/png;base64') === 0);

	return <React.Fragment>
		<Box>
			{label
				? <Box pb={helperText
					? 1
					: 2}>
					<Typography
						component="div"
						variant="h6">
						{label}
					</Typography>
				</Box>
				: <React.Fragment />}
			<Box 
				py={2}
				maxWidth="240px">
				<SelectSystem
					disabled={disabled}
					name={`${name}-systemId`}
					label="Select system"
					value={loaclValue['systemId'] || ''}
					onChange={onChangeSystemId}
					error={loaclValue['errorSystemId']} />
			</Box>
			{loaclValue['systemId']
				? <React.Fragment>
					<Box pb={2}>
						<Button
							disabled={disabled}
							disableElevation
							component="label"
							variant="contained"
							color="primary"
							startIcon={<InsertDriveFileIcon />}>
							Select file
							{/*accept="image/png, image/jpeg"*/}
							<input 
								id={`input-file-${name}`}
								name={name}
								type="file"
								onChange={onFile}
								style={{
									display: 'none',
								}} />
						</Button>
					</Box>
					<Box
						ref={imageBoxRef}
						maxWidth="240px"
						sx={{
							...isImage
								? {
									backgroundImage: `url('${updateFlag
										? loaclValue['src']
										: (process.env.SERVICE_FILES + loaclValue['src'])}?accessToken=${localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}')`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}
								: {},
							'&:after': {
								content: '""',
								display: 'block',
								paddingBottom: isImage
									? '240px'
									: '0px',
							},
						}} />
				</React.Fragment>
				: <React.Fragment />}
			{helperText
				? <Box pb={2}>
					<Typography	component="div">
						{helperText}
					</Typography>
				</Box>
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

InputFile = React.memo(InputFile);
InputFile.defaultProps = {
	onChange: () => {},
};
InputFile.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string.isRequired,
};

export default InputFile;
