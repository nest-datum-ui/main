import React from 'react';
import { 
	ContextProps,
	ContextService,
} from '@nest-datum-ui/Context';
import { 
	actionApiFormUpdate,
	actionDialogClose, 
} from '@nest-datum-ui/Store';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Field from '@nest-datum-ui/Field';
import InputText from '@nest-datum-ui/Input/Text';
import StyledWrapper from './Styled/Wrapper.jsx';

let Description = ({ entityId }) => {
	const serviceName = React.useContext(ContextService);
	const { 
		[serviceName]: {
			johnConnorDescriptionForm: {
				id,
				storeName,
				apiFullUrl: apiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const onSubmitWrapper = React.useCallback((e) => actionApiFormUpdate(storeName, { apiUrl, entityId })(), [
		storeName,
		apiUrl,
		entityId,
	]);
	const onClose = React.useCallback(() => actionDialogClose('dialogDescription')(), [
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		entityId={entityId}
		onSubmit={onSubmitWrapper}
		loadOnFirstRender>
		<Box pb={2}>
			<Field
				Component={InputText}
				form={id}
				name="value"
				label="Description"
				rows={4}
				multiline />
		</Box>
		<Box pb={2}>
			<Field
				Component={InputText}
				form={id}
				name="color"
				label="Color" />
		</Box>
		<Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
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
					form={id}  
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

Description = React.memo(Description);
Description.defaultProps = {
};
Description.propTypes = {
};

export default Description;
