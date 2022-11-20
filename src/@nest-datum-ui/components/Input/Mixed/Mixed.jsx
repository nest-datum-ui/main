import React from 'react';
import PropTypes from 'prop-types';
import Loader from '@nest-datum-ui/components/Loader';

const DataTypes = {
	int: () => React.lazy(() => import('@nest-datum-ui/components/Input/Int')),
	float: () => React.lazy(() => import('@nest-datum-ui/components/Input/Float')),
	bool: () => React.lazy(() => import('@nest-datum-ui/components/Input/Bool')),
	text: () => React.lazy(() => import('@nest-datum-ui/components/Input/Text')),
	richtext: () => React.lazy(() => import('@nest-datum-ui/components/Input/Richtext')),
	phone: () => React.lazy(() => import('@nest-datum-ui/components/Input/Phone')),
	email: () => React.lazy(() => import('@nest-datum-ui/components/Input/Email')),
	url: () => React.lazy(() => import('@nest-datum-ui/components/Input/Url')),
	password: () => React.lazy(() => import('@nest-datum-ui/components/Input/Password')),
	file: () => React.lazy(() => import('@nest-datum-ui/components/Input/File')),
	time: () => React.lazy(() => import('@nest-datum-ui/components/Input/Time')),
	date: () => React.lazy(() => import('@nest-datum-ui/components/Input/Date')),
	datetime: () => React.lazy(() => import('@nest-datum-ui/components/Input/DateTime')),
};
let Mixed = ({
	dataTypeId,
	...props
}) => {
	const Component = (DataTypes[dataTypeId] ?? (() => {}))();

	return <React.Fragment>
		<React.Suspense fallback={<Loader visible />}>
			{Component
				? <Component { ...props } />
				: <React.Fragment />}
		</React.Suspense>
	</React.Fragment>;
};

Mixed = React.memo(Mixed);
Mixed.defaultProps = {
};
Mixed.propTypes = {
	dataTypeId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
};

let MixedMemo = ({
	dataTypeId,
	defaultValue,
	...props
}) => {
	const [ defaultValueMemo ] = React.useState(() => defaultValue);

	return DataTypes[dataTypeId]
		? <Mixed 
			{ ...props } 
			{ ...(typeof defaultValueMemo !== 'undefined'
				&& defaultValueMemo !== null
				&& !Number.isNaN(defaultValueMemo))
				? { defaultValue: defaultValueMemo }
				: {} }
			dataTypeId={dataTypeId} />
		: <React.Fragment />;
};

MixedMemo = React.memo(MixedMemo);
MixedMemo.defaultProps = {
};
MixedMemo.propTypes = {
};

export default MixedMemo;
