import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { fireListSearchUrl as actionApiListSearchUrl } from '@nest-datum-ui/components/Store/api/actions/list/searchUrl.js';
import { fireListClearFilterUrl as actionApiListClearFilterUrl } from '@nest-datum-ui/components/Store/api/actions/list/clearFilterUrl.js';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Loader from '@nest-datum-ui/components/Loader';
import ButtonClear from '@nest-datum-ui/components/Button/Clear';
import ButtonCollapse from '@nest-datum-ui/components/Button/Collapse';
import ButtonCheckBulk  from '@nest-datum-ui/components/Button/Check/Bulk';
import FormSearch from '@nest-datum-ui/components/Form/Search';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObjFilled from '@nest-datum-ui/utils/check/obj/filled.js';

let Filter = ({ 
	bulkDeletion,
	toolbarComponent,
	children, 
	onBulk,
	onDrop,
	storePath,
	length,
	loader,
}) => {
	const { search } = useLocation();
	const [ filterFlag, setFilterFlag ] = React.useState(() => false);
	const filterData = React.useMemo(() => utilsUrlSearchPathItem('filter', search, true), [
		search,
	]);
	const query = React.useMemo(() => utilsUrlSearchPathItem('query', search), [
		search,
	]);
	const onFilterFlag = React.useCallback((e) => setFilterFlag((currentState) => !currentState), [
		setFilterFlag,
	]);
	const onSearch = React.useCallback(actionApiListSearchUrl, [
	]);
	const onClear = React.useCallback(actionApiListClearFilterUrl, [
	]);

	return <React.Fragment>
		<Loader visible={loader} />
		<div 
			style={{
				display: (!loader)
					? 'block'
					: 'none',
			}}>
			{(toolbarComponent || utilsCheckBool(bulkDeletion))
				&& <Grid
					container
					spacing={3}
					alignItems="center"
					justifyContent={bulkDeletion
						? 'space-between'
						: 'flex-start'}>
					{utilsCheckBool(bulkDeletion)
						&& <ButtonCheckBulk 
							show={bulkDeletion}
							storePath={storePath}
							length={length}
							onClick={onBulk}
							onDrop={onDrop} />}
					{toolbarComponent
						&& <Grid
							item
							xs={false}>
							{toolbarComponent}
						</Grid>}
				</Grid>}
			<Box
				pt={toolbarComponent
					? 1
					: 0}
				pb={1}>
				<FormSearch 
					id="form-search"
					onSearch={onSearch}
					defaultValue={query} />
			</Box>
			<Grid
				container
				spacing={3}
				alignItems="center"
				justifyContent="flex-end">
				<Grid
					container
					item
					alignItems="center"
					justifyContent="flex-end"
					xs={false}>
					{((utilsCheckStr(query) && query) || utilsCheckObjFilled(filterData))
						&& <Grid
							item
							xs={false}>
							<ButtonClear onClick={onClear}>
								Clear
							</ButtonClear>
						</Grid>}
					<Grid
						item
						xs={false}>
						<ButtonCollapse
							open={filterFlag}
							onClick={onFilterFlag}>
							Filters
						</ButtonCollapse>
					</Grid>
				</Grid>
			</Grid>
			<Box 
				pb={filterFlag
					? 2
					: 0}
				sx={{
					position: 'relative',
					overflow: 'hidden',
					...filterFlag
						? {
							height: 'initial',
							opacity: '1',
						}
						: {
							height: '0px',
							opacity: '0.01',
						},
					}}>
				{utilsCheckArr(children)
					? <Grid
						container
						spacing={3}>
						{children.map((item, index) => <Grid
							key={index}
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							xl={2}>
							{item}
						</Grid>)}
					</Grid>
					: children}
			</Box>
		</div>
	</React.Fragment>;
};

Filter = React.memo(Filter);
Filter.defaultProps = {
	onBulk: () => {},
	onDrop: () => {},
};
Filter.propTypes = {
	bulkDeletion: PropTypes.bool,
	callbackBefore: PropTypes.func,
	callbackAfter: PropTypes.func,
	onBulk: PropTypes.func,
	onDrop: PropTypes.func,
	storePath: PropTypes.array,
	length: PropTypes.number,
	loader: PropTypes.bool,
};

export default Filter;
