import React from 'react';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Dialog from '@nest-datum-ui/components/Dialog';

let Item = ({
	storeName,
	withAccessToken,
	url,
	path,
	relationId,
	entityId,
	children,
	...props
}) => {
	const formLoader = useSelector(selectorMainExtract([ 'api', 'form', storeName, 'loader' ]));
	const listLoader = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'loader' ]));
	const loader = formLoader === true || listLoader === true;

	return <React.Fragment>
		<Dialog 
			{ ...props }
			loader={loader}
			disableActions
			maxWidth="xs"
			id={`${storeName}Item`}
			title="Associate the current entity with another model?">
			{children}
		</Dialog>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {};
Item.propTypes = {
};

export default Item;