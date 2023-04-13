import React from 'react';
import { 
	ContextProps,
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	actionApiFormCreate,
	actionApiFormProp,
	actionDialogClose, 
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Field from '@nest-datum-ui/Field';
import InputText from '@nest-datum-ui/Input/Text';
import StyledWrapper from './Styled/Wrapper.jsx';

let Value = ({ entityId }) => {
	const serviceName = React.useContext(ContextService);
	const { 
		[serviceName]: {
			johnConnorValueForm: {
				id,
				storeName,
				apiFullUrl: apiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const [ result, setResult ] = React.useState(() => undefined);
	const onSubmitWrapper = React.useCallback((e) => actionApiFormCreate(storeName, { apiUrl: `${apiUrl}/${entityId}` })((storeName, state, { payload: { data } }) => {
		actionApiFormProp(storeName, 'loader', false)();

		data['result']
			? setResult(data['result'])
			: actionDialogClose('dialogValue')();
	}), [
		storeName,
		apiUrl,
		entityId,
		setResult,
	]);
	const onClose = React.useCallback(() => actionDialogClose('dialogValue')(), [
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}>
		<Box pb={2}>
			{result
				? result
				: <Field
					Component={InputText}
					form={id}
					name="data"
					label="Data"
					rows={4}
					multiline />}
		</Box>
		<Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
			{result
				&& <Grid item xs={false}>
					<ButtonPrimary
						size="small" 
						startIcon={<ReplayIcon />}>
						Repeat
					</ButtonPrimary>
				</Grid>}
			<Grid item xs={false}>
				<ButtonPrimary 
					form={id} 
					type="submit" 
					size="small" 
					startIcon={<SaveIcon />}>
					Save
				</ButtonPrimary>
			</Grid>
			<Grid item xs={false}>
				<ButtonPrimary 
					color="error" 
					size="small" 
					startIcon={<CloseIcon />} 
					onClick={onClose}>
					Close
				</ButtonPrimary>
			</Grid>
		</Grid>
	</StyledWrapper>;
};

Value = React.memo(Value);
Value.defaultProps = {
};
Value.propTypes = {
};

export default Value;
