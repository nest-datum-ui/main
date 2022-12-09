import React from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MuiPagination from '@mui/material/Pagination';
import Loader from '@nest-datum-ui/components/Loader';
import SelectMultiple from '@nest-datum-ui/components/Select/Multiple';
import SelectLimit from '@nest-datum-ui/components/Select/Limit';
import FormSearch from '@nest-datum-ui/components/Form/Search';

let Multiple = ({
	name,
	children,
	...props
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'loader' ]));
	const total = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'total' ])) ?? 0;
	const page = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'page' ])) ?? 1;
	const limit = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'limit' ])) ?? 20;
	const query = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'query' ]));
	const data = useSelector(selectorMainExtract([ 'api', 'list', 'formsFormStatusList', 'data' ]));
	const onChangePage = React.useCallback((e, newPage) => {
		actionApiListProp('formsFormStatusList', 'loader', true)();
		actionApiListProp('formsFormStatusList', 'page', newPage)();
	}, [
	]);
	const onLimit = React.useCallback((e) => {
		actionApiListProp('formsFormStatusList', 'loader', true)();
		actionApiListProp('formsFormStatusList', 'limit', e.target.value)();
	}, [
	]);
	const onSearch = React.useCallback((e) => {
	}, [
	]);

	React.useEffect(() => {
		if (!unmount) {
			actionApiListGet({
				id: 'formsFormStatusList', 
				url: process.env.SERVICE_FORMS,
				path: 'form-status',
				withAccessToken: true,
				page, 
				limit, 
				query,
			})(enqueueSnackbar);
		}
	}, [
		unmount,
		enqueueSnackbar,
		page,
		limit,
		query,
	]);

	React.useEffect(() => () => {
		actionApiListClear('formsFormStatusList')();
	}, [
	]);

	return <React.Fragment>
		<Loader 
			visible={loader || unmount}
			wrapper={{
				p: 0,
			}}
			sx={{
				minWidth: '24px',
				maxWidth: '24px',
				minHeight: '24px',
				maxHeight: '24px',
			}} />
		{(!loader && !unmount)
			? <React.Fragment>
				<SelectMultiple 
					name={name}
					{ ...props }>
					{children
						? children
						: (Array.isArray(data)
							? ([
								...(page === 1 && total < limit)
									? []
									: [
										<FormSearch
											key="formSearch"
											name={`select-${name.toString()}-search`}
											onSearch={onSearch} />,
									],
								...data,
								...(page === 1 && total < limit)
									? []
									: [
										<Grid
											key="MuiPagination"
											container
											alignItems="center"
											justifyContent="space-between"
											sx={{
												padding: '14px 8px 0px 0px',
											}}>
											<Grid
												item
												xs={true}>
												<MuiPagination 
													count={Math.ceil(total / limit)}
													page={page}
													onChange={onChangePage} />
											</Grid>
											<Grid
												item
												xs={false}
												sx={{
													minWidth: '90px',
												}}>
												<SelectLimit
													label="Limit"
													size="small"
													value={limit}
													onChange={onLimit} />
											</Grid>
										</Grid>
									],
							])
							: <MenuItem>
								<Loader 
									visible
									wrapper={{
										p: 0,
									}}
									sx={{
										minWidth: '24px',
										maxWidth: '24px',
										minHeight: '24px',
										maxHeight: '24px',
									}} />
							</MenuItem>)}
				</SelectMultiple>
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

Multiple = React.memo(Multiple);
Multiple.defaultProps = {
	name: 'formStatusId',
	multiple: false,
	onChange: () => {},
};
Multiple.propTypes = {
};

export default Multiple;
