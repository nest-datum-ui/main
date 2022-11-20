import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import Field from './Field';
import onSetDefault from './onSetDefault.js';

let Reference = ({
	withAccessToken,
	entityId,
	url,
	path,
	pathEntity,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const storeName = `options${entityId}`;
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const dataReady = Array.isArray(data) && (data || []).length > 0;
	const location = window.location.pathname;
	const entityName = (location.split('/'))[2];
	const entityNameUpperCase = entityName.charAt(0).toUpperCase() + entityName.slice(1);

	React.useEffect(() => {
		if (!unmount
			&& url
			&& entityId
			&& entityId !== '0') {
			actionApiListGet({
				id: storeName, 
				url,
				path,
				withAccessToken,
				page: 1, 
				limit: 9999,
				relations: {
					[`${entityName}${entityNameUpperCase}Options`]: {
						[`${entityName}${entityNameUpperCase}${entityNameUpperCase}Options`]: true,
					},
				},
				filter: {
					isDeleted: false,
					[`${entityName}${entityNameUpperCase}Options`]: {
						[`${entityName}Id`]: entityId,
					},
				},
			})(enqueueSnackbar);
		}
	}, [
		unmount,
		entityId,
		storeName,
		path,
		url,
		withAccessToken,
		entityName,
		entityNameUpperCase,
		enqueueSnackbar,
	]);

	React.useEffect(() => {
		if (dataReady
			&& entityId
			&& entityId !== '0') {
			onSetDefault({
				storeName,
				entityId,
			});
		}
	}, [
		dataReady,
		storeName,
		entityId,
	]);

	React.useEffect(() => () => {
		actionApiListClear(storeName)();
	}, [
		storeName,
	]);

	return <React.Fragment>
		<Loader visible={unmount} />
		{(dataReady
			&& !unmount)
			? <React.Fragment>
				<Box 
					pt={2}
					pb={1}>
					<Typography
						component="div"
						variant="h6">
						Options:
					</Typography>
				</Box>
				{(data.map(({ 
					id,
					values,
					...itemData 
				}, index) => {
					return <Field
						{ ...itemData }
						key={id}
						id={id}
						index={index}
						storeName={storeName}
						values={() => values} />
				}))}
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

Reference = React.memo(Reference);
Reference.defaultProps = {
};
Reference.propTypes = {
	withAccessToken: PropTypes.bool,
	entityId: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
};

export default Reference;
