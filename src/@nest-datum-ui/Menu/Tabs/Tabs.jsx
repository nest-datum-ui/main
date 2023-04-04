import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { 
	selectorMainExtract,
	actionApiFormClear, 
} from '@nest-datum-ui/Store';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import Tab from './Tab';
import StyledWrapper from './Styled/Wrapper.jsx';

let Tabs = ({ storeName, children, onChange, ...props }) => {
	let indexDefault = 0;
	const { pathname } = useLocation();
	const childrenProcessed = children.map(({ Component, to, label, display }, index) => {
		indexDefault = pathname.indexOf(to) === 0
			? index
			: indexDefault;

		return display
			? (Component
				? <Component key={index} to={to} label={label} index={index} />
				: <Tab key={index} to={to} label={label} index={index} />)
			: <React.Fragment key={index} />;
	});
	const tab = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'tab' ])) || indexDefault;
	const onChangeWrapper = React.useCallback((e, newValue) => {
		actionApiFormClear(storeName, { tab: newValue })();
		
		if (utilsCheckFunc(onChange)) {
			onChange(e, newValue);
		}
	}, [
		onChange,
		storeName,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(storeName)();
	}, [
		storeName,
	]);

	return <StyledWrapper 
		variant="scrollable" 
		value={tab}
		onChange={onChangeWrapper}
		{ ...props }>
		{childrenProcessed}
	</StyledWrapper>;
};

Tabs = React.memo(Tabs);
Tabs.defaultProps = {
	children: [],
};
Tabs.propTypes = {
	storeName: PropTypes.string.isRequired,
	children: PropTypes.array,
};

export default Tabs;
