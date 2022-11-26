import React from 'react';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Dialog from '@nest-datum-ui/components/Dialog';
import FormSystemReference from '@nest-datum-ui/files/components/Form/System/Reference';

let Item = ({
	storeName,
	id,
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
			id={id}
			title="Associate the current option with a file system">
			<FormSystemReference storeName={storeName} />
		</Dialog>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	id: 'filesSystemReferenceItem',
};
Item.propTypes = {
};

export default Item;