import React from 'react';
import PropTypes from 'prop-types';
import Loader from '@nest-datum-ui/components/Loader';

const DataTypes = {
	'data-type-type-integer': () => React.lazy(() => import('@nest-datum-ui/components/Input/Int')),
	'data-type-type-float': () => React.lazy(() => import('@nest-datum-ui/components/Input/Float')),
	'data-type-type-boolean': () => React.lazy(() => import('@nest-datum-ui/components/Input/Bool')),
	'data-type-type-text': () => React.lazy(() => import('@nest-datum-ui/components/Input/Text')),
	'data-type-type-file-upload': () => React.lazy(() => import('@nest-datum-ui-lib/files/components/Input/Upload')),
	'data-type-type-file-select': () => React.lazy(() => import('@nest-datum-ui-lib/files/components/Input/Select')),
};
let Mixed = ({
	dataTypeId,
	...props
}) => {
	const Component = React.useMemo(() => (DataTypes[dataTypeId] ?? (() => {}))(), [
		dataTypeId,
	]);

	return <React.Fragment>
		<React.Suspense fallback={<Loader visible />}>
			{Component
				? <Component 
					{ ...props }
					{ ...(dataTypeId === 'data-type-type-file-select')
						? { select: true }
						: {} } />
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
	// defaultValue,
	...props
}) => {
	// const [ defaultValueMemo ] = React.useState(() => defaultValue);

	/*...(typeof defaultValueMemo !== 'undefined'
		&& defaultValueMemo !== null
		&& !Number.isNaN(defaultValueMemo))
		? { defaultValue: defaultValueMemo }
		: {} */

	return DataTypes[dataTypeId]
		? <Mixed 
			{ ...props } 
			dataTypeId={dataTypeId} />
		: <React.Fragment />;
};

MixedMemo = React.memo(MixedMemo);
MixedMemo.defaultProps = {
};
MixedMemo.propTypes = {
};

export default MixedMemo;
