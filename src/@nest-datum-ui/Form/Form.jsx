import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Portal } from 'react-portal';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import { 
	func as urilsCheckFunc,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import Progress from '@nest-datum-ui/Progress';
import StyledWrapper from './Styled/Wrapper.jsx';

let Form = ({
	storeName,
	id,
	onSubmit,
	ProgressComponent,
	children,
	...props
}) => {
	const { entityId } = useParams();
	const loader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const fetched = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'fetched' ]));
	const onSubmitWrapper = React.useCallback((e) => {
		if (urilsCheckFunc(onSubmit)) {
			e.preventDefault();
			
			onSubmit(e);
		}
	}, [
		onSubmit,
	]);
	const loaderProcessed = !!loader || (utilsCheckStrIdExists(entityId)
		? !fetched
		: false);

	return <StyledWrapper loader={Number(loaderProcessed)} { ...props }>
		{ProgressComponent
			? <ProgressComponent visible={loaderProcessed} />
			: <Progress visible={loaderProcessed} />}
		<Portal node={document && document.getElementById('root')}>
			<form 
				id={id}
				onSubmit={onSubmitWrapper} />
		</Portal>
		{!loaderProcessed
			&& <div className="form-children__wrapper">
				{children}
			</div>}
	</StyledWrapper>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
	storeName: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onSubmit: PropTypes.func,
};

export default Form;
