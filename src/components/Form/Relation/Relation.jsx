import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import Store, { 
	actionApiFormRelation,
} from '@nest-datum-ui/Store';
import { 
	obj as utilsCheckObj,
	func as utilsCheckFunc,
} from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import ButtonPrimary from '@nest-datum-ui/Button/Primary';
import Field from '@nest-datum-ui/Field';
import InputText from '@nest-datum-ui/Input/Text';
import StyledWrapper from './Styled/Wrapper.jsx';

let Relation = ({ children }) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: {
				storeName: listStoreName,
				formName,
			}, 
		},
	} = React.useContext(ContextProps);
	const {
		[serviceName]: {
			[formName]: {
				id,
				storeName,
				apiFullUrl: apiUrl,
				fields,
			},
		},
	} = React.useContext(ContextProps);
	const { entityId } = useParams();
	const fieldsNames = React.useMemo(() => [], [
	]);
	const relationsData = React.useMemo(() => (Store().getState().api.list[listStoreName] || {}), [
		listStoreName,
	]);
	const fieldsProcessed = fields.map((Item, index) => <Box key={index} py={1}>
		{utilsCheckObj(Item)
			? ((typeof Item['$$typeof'] === 'symbol')
				? <Item />
				: (() => {
					const { Component, apiFullUrl: apiUrl, filter, ...itemProps } = Item;

					fieldsNames.push(itemProps);

					return <Field 
						{ ...itemProps }
						{ ...itemProps.storeName
							? { form: itemProps.storeName }
							: {} }
						Component={(utilsCheckObj(Component) && typeof Component['$$typeof'] === 'symbol')
							? Component
							: InputText} 
						filter={utilsCheckFunc(filter)
							? filter(index, storeName, entityId, relationsData)
							: filter}
						apiUrl={apiUrl} />;
				})())
			: <Field Component={InputText} form={id} name={String(index)} />}
		</Box>);
	const onSubmitWrapper = React.useCallback((e) => {
		actionApiFormRelation(storeName, { listStoreName, apiUrl, entityId, fields: fieldsNames });
	}, [
		storeName,
		listStoreName,
		apiUrl,
		entityId,
		fieldsNames,
	]);

	return <StyledWrapper
		storeName={storeName} 
		id={id} 
		apiUrl={apiUrl}
		onSubmit={onSubmitWrapper}>
		{fieldsProcessed}
		<Box pb={2}>
			<ButtonPrimary form={id} type="submit" startIcon={<SaveIcon />}>
				Save
			</ButtonPrimary>
		</Box>
    </StyledWrapper>;
};

Relation = React.memo(Relation);
Relation.defaultProps = {
	onSubmit: () => {},
};
Relation.propTypes = {
	id: PropTypes.string,
	storeName: PropTypes.string,
	apiUrl: PropTypes.string,
	children: PropTypes.array,
};

export default Relation;
