import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { 
	selectorMainExtract, 
	actionApiFormMerge,
} from '@nest-datum-ui/Store';
import { obj as utilsCheckObj } from '@nest-datum-utils/check';
import { 
	ContextRoute,
	ContextService,
	ContextProps,
} from '@nest-datum-ui/Context';

let FieldMemo = ({ 
	Component,
	name,
	onChange,
	type,
	form: formId,
	value: propValue,
	defaultValue: propDefaultValue,
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { storeName: contextStoreName } } } = React.useContext(ContextProps);
	const storeName = formId ?? contextStoreName;
	const [ valueMemo, setValueMemo ] = React.useState(() => propValue ?? propDefaultValue);
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const error = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'errors', name ]));
	const onChangeWrapper = React.useCallback((e) => {
		Component['nodeTarget'] = e.target;

		setValueMemo((utilsCheckObj(e)
			&& utilsCheckObj(e.target))
			? ((type === 'checkbox')
				? e.target.checked
				: (e.target.files || e.target.value))
			: e);
	}, [
		setValueMemo,
		Component,
		type,
	]);

	React.useEffect(() => {
		if (Component['nodeTarget']) {
			actionApiFormMerge(storeName, {
				errors: {},
				[name]: valueMemo,
				...Component['nodeTarget']['additionalValue']
					? { [`${name}_additionalValue`]: Component['nodeTarget']['additionalValue'] }
					: {},
			})(() => {
				onChange({ target: Component['nodeTarget'] });
			});
		}
	}, [
		Component,
		valueMemo,
		storeName,
		name,
		onChange,
	]);

	return <Component 
		{ ...props }
		{ ...formId
			? { form: formId }
			: {} }
		storeName={storeName}
		name={name}
		loader={Number(!!loader)} 
		error={error} 
		value={(type === 'date')
			? (valueMemo
				? new Date(valueMemo)
				: new Date())
			: ((type === 'object' || type === 'daterange')
				? Object(valueMemo)
				: ((type === 'checkbox')
					? Boolean(valueMemo)
					: String(valueMemo || '')))} 
		onChange={onChangeWrapper} />;
};

FieldMemo = React.memo(FieldMemo);

let Field = ({ 
	Component,
	name,
	type: propType,
	form: formId,
	value: propValue,
	defaultValue: propDefaultValue,
	...props 
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { [serviceName]: { [routeName]: { form, list } } } = React.useContext(ContextProps);
	const [ ComponentMemo ] = React.useState(() => Component);
	const storeName = formId ?? (form || {}).storeName ?? (list || {}).storeName;
	const value = useSelector(selectorMainExtract([ 'api', 'form', storeName, name ])) ?? propValue ?? propDefaultValue;
	const type = ((Component['defaultProps'] || {})['type'] ?? propType) ?? ((Component['type'] || {}).name || '').toLowerCase();

	return <FieldMemo
		Component={ComponentMemo}
		type={type}
		name={name}
		form={formId}
		defaultValue={value}
		{ ...props } />;
};

Field = React.memo(Field);
Field.defaultProps = {
	onChange: () => {},
};
Field.propTypes = {
	Component: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func,
	]).isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	storeName: PropTypes.string,
};

export default Field;
