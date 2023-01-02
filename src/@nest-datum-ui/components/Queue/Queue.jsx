import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { fireAdd as actionQueueAdd } from '@nest-datum-ui/components/Store/queue/actions/add.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import selectorQueueNow from '@nest-datum-ui/components/Store/queue/selectors/now.js';

let QueueMemo = ({
	Component,
	uniqueId,
	queueName,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const queueNow = useSelector(selectorQueueNow(queueName));
	const loadAllow = queueNow === uniqueId;

	React.useEffect(() => {
		if (!unmount) {
			actionQueueAdd(queueName, uniqueId)();
		}
	}, [
		unmount,
		uniqueId,
		queueName,
	]);

	return <Component
		unmount={unmount}
		loadAllow={loadAllow}
		{ ...props } />;
};

QueueMemo = React.memo(QueueMemo);
QueueMemo.defaultProps = {
};
QueueMemo.propTypes = {
	uniqueId: PropTypes.string.isRequired,
	queueName: PropTypes.string.isRequired,
};

let Queue = (queueName, Component) => React.memo((props) => {
	const [ uniqueId ] = React.useState(() => uuidv4());

	return <QueueMemo 
		uniqueId={uniqueId}
		queueName={queueName}
		Component={Component}
		{ ...props } />;
});

export default Queue;
