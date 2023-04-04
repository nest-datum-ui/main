import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextProps,
	ContextRoute, 
	ContextService,
} from '@nest-datum-ui/Context';
import Typography from '@mui/material/Typography';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import TypographyTable from 'components/Typography/Table';
import TypographyTableConfig from 'components/Typography/Table/Config';
import StyledWrapper from './Styled/Wrapper.jsx';

let Row = ({
	id,
	name,
	description,
	dataTypeId,
	regex,
	defaultValue,
	isMultiline,
	isRequired,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				parentName, 
			}, 
		},
		'data-type': { 
			dataTypeList: {
				apiFullUrl: dataTypeListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const { [serviceName]: { [parentName]: { pageFullUrl } } } = React.useContext(ContextProps);

	return <StyledWrapper id={id} isDeleted={isDeleted} isNotDelete={isNotDelete} createdAt={createdAt} updatedAt={updatedAt}>
		{([{ 
			children: <TypographyTable key={0} to={`${pageFullUrl}/${id}`} isDeleted={isDeleted}>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="h6">
					{name}
				</TypographyTable>
				<div />
				<TypographyTable to={`${pageFullUrl}/${id}`} isDeleted={isDeleted} variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch key={2} apiUrl={dataTypeListApiUrl}>
				{dataTypeId}
			</TypographyFetch>, 
		}, { 
			children: <React.Fragment key={3}>
				<Typography	component="div">
					{String(defaultValue || '')}
				</Typography>
				<TypographyTableConfig regex={regex} isRequired={isRequired} isMultiline={isMultiline} />
			</React.Fragment>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
	bulkDeletion: false,
	onCheck: () => {},
};
Row.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	dataTypeId: PropTypes.string,
	regex: PropTypes.string,
	isRequired: PropTypes.bool,
	isMultiline: PropTypes.bool,
	isDeleted: PropTypes.bool,
	isNotDelete: PropTypes.bool,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
};

export default Row;
