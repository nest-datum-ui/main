import React from 'react';
import { useSelector } from 'react-redux';
import { 
	useParams,
	useNavigate, 
} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormGet as actionApiFormGet } from '@nest-datum-ui/components/Store/api/actions/form/get.js';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SelectReportStatus from '@nest-datum-ui-lib/cv/components/Select/Report/Status';
import FormContentField from '@nest-datum-ui-lib/forms/components/Form/Content/Field';
import TableManyToMany from '@nest-datum-ui/components/Table/ManyToMany';
import Loader from '@nest-datum-ui/components/Loader';
import InputText from '@nest-datum-ui/components/Input/Text';
import onCreate from './onCreate.js';

let Report = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { entityId } = useParams();
	const navigate = useNavigate();
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const loader = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'loader' ]));
	const id = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'id' ]));
	const reportStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'reportStatusId' ]));
	const file = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'file' ]));
	const contentId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'contentId' ]));
	const formId = useSelector(selectorMainExtract([ 'api', 'form', contentId, 'formId' ]));
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'isDeleted' ]));
	const errorId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'id' ]));
	const errorReportStatusId = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'reportStatusId' ]));
	const errorFile = useSelector(selectorMainExtract([ 'api', 'form', entityId, 'errors', 'file' ]));
	const onSubmit = React.useCallback((e) => {
		e.preventDefault();

		onCreate({
			gateway: process.env.SERVICE_CV,
			entityId,
			path: 'report',
			withAccessToken: true,
			enqueueSnackbar,
			navigate,
		});
	}, [
		entityId,
		enqueueSnackbar,
		navigate,
	]);
	const onChangeId = React.useCallback((e) => {
		actionApiFormProp(entityId, 'id', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeFile = React.useCallback((e) => {
		actionApiFormProp(entityId, 'file', e.target.value)();
	}, [
		entityId,
	]);
	const onChangeReportStatusId = React.useCallback((e, newValue) => {
		actionApiFormProp(entityId, 'reportStatusId', e.target.value)();
	}, [
		entityId,
	]);
	const onDelete = React.useCallback((e) => {
		actionDialogOpen('optionDrop', { entityId })();
	}, [
		entityId,
	]);
	const manyToManyFilterOptions = React.useCallback(() => ({
		contentId,
	}), [
		contentId,
	]);
	const manyToManyRelationOptions = React.useCallback(() => ({
		field: true,
	}), [
	]);
	const manyToManyColumns = React.useCallback(() => ([
		[ 'fieldId', 'Field', '20%', (column, data) => {
			return <React.Fragment>
				<Box pb={1}>
					<Typography	
						component="div"
						variant="h6">
						{(data['field'] || {})['name'] || ''}
					</Typography>
				</Box>
				<Typography	
					component="div"
					variant="caption">
					{(data['field'] || {})['description'] || ''}
				</Typography>
			</React.Fragment>;
		} ], 
		[ 'value', 'Value', '40%', (column, data) => {
			return <React.Fragment>
				{((data['field'] || {})['dataTypeId'] === 'data-type-type-file')
					? <React.Fragment>
						{(() => {
							let content = '';

							try {
								content = JSON.parse(data[column]);
							}
							catch (err) {
							}
							const resourceUrl = (content['src'].indexOf('http') === 0)
								? content['src']
								: (content['src'].includes('?accessToken=')
									? `${process.env.SERVICE_FILES}${content['src']}`
									: `${process.env.SERVICE_FILES}${content['src']}?accessToken=${localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}`);

							return <a 
								target="_blank"
								rel="noreferrer"
								href={resourceUrl}
								style={{
									display: 'block',
								}}>
								<Box
									sx={{
										width: '100%',
										height: '100%',
										...(!loader
											&& (content['type'] === 'png'
												|| content['type'] === 'jpeg'
												|| content['type'] === 'jpg'
												|| content['type'] === 'svg'
												|| content['type'] === 'gif'))
											? {
												backgroundColor: '#f7f7f7',
												backgroundImage: `url("${process.env.SERVICE_FILES}${content['src']}?accessToken=${localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}")`,
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat',
												'&:after': {
													content: '""',
													display: 'block',
													paddingBottom: '100%',
												},
											}
											: {},
										}}>
										{(content['type'] === 'pdf')
											? <PictureAsPdfIcon
												sx={{
													fontSize: '500%',
												}} />
											: <React.Fragment />}
									{loader
										? <Loader 
											visible
											wrapper={{
												sx: {
													padding: '0px',
												},
											}}
											sx={{
												minWidth: '80px',
												maxWidth: '80px',
												minHeight: '80px',
												maxHeight: '80px',
											}} />
										: <React.Fragment />}
								</Box>
							</a>
						})()}
					</React.Fragment>
					: <Typography component="div">
						{(data[column] || '')
							.split("\n")
							.map((line, ii) => {
								return <Box 
									key={ii}
									pb={1}>
									{line}
								</Box>;
							})}
					</Typography>}
			</React.Fragment>;
		} ], 
		[ 'userId', 'User', '20' ], 
		[ 'createdAt', 'Create at', '20%' ],
	]), [
		loader,
	]);

	React.useEffect(() => {
		if (!unmount
			&& entityId
			&& entityId !== '0') {
			actionApiFormGet({
				entityId,
				url: process.env.SERVICE_CV,
				path: 'report',
				withAccessToken: true,
			})(enqueueSnackbar, navigate);
		}
	}, [
		unmount,
		entityId,
		enqueueSnackbar,
		navigate,
	]);

	React.useEffect(() => {
		if (!unmount
			&& contentId
			&& contentId !== '0') {
			actionApiFormGet({
				entityId: contentId,
				url: process.env.SERVICE_FORMS,
				path: 'content',
				withAccessToken: true,
			})(enqueueSnackbar);
		}
	}, [
		unmount,
		contentId,
		enqueueSnackbar,
	]);

	React.useEffect(() => () => {
		actionApiFormClear(entityId)();
	}, [
		entityId,
	]);

	return <React.Fragment>
		<Loader	visible={typeof loader === 'undefined' || unmount} />
		<form 
			onSubmit={onSubmit}
			style={{
				display: (typeof loader === 'undefined' || unmount)
					? 'none'
					: 'initial',
			}}>
			<Box py={2}>
				<InputText
					disabled={loader}
					name="id"
					label="id"
					helperText="Unique identificator"
					placeholder="For example: test-entity-id"
					value={id || ''}
					onChange={onChangeId}
					error={errorId} />
			</Box>
			<Box py={2}>
				<InputText
					disabled={loader}
					required
					name="file"
					label="File url"
					placeholder="For example: http://site.com/example.txt"
					value={file || ''}
					onChange={onChangeFile}
					error={errorFile} />
			</Box>
			<Box py={2}>
				<SelectReportStatus
					disabled={loader}
					label="Report status"
					name="reportStatusId"
					value={reportStatusId || ''}
					onChange={onChangeReportStatusId}
					error={errorReportStatusId} />
			</Box>
			{(contentId
				&& typeof contentId === 'string'
				&& contentId !== '0'
				&& formId)
				? <TableManyToMany
					withAccessToken
					url={process.env.SERVICE_FORMS}
					path="content/field"
					storeName="formsContentFieldRelation"
					filterOptions={manyToManyFilterOptions}
					relationOptions={manyToManyRelationOptions}
					columns={manyToManyColumns}
					title="Fields"
					description="Fields of current form content.">
					<FormContentField
						withAccessToken
						formId={formId}
						entityId={contentId}
						url={process.env.SERVICE_FORMS}
						path="content/field"
						pathCreate={`content/${contentId}/field`}
						storeName="formsContentFieldRelation" />
				</TableManyToMany>
				: <React.Fragment />}
			<Grid
				container
				spacing={3}
				alignItems="center"
				justifyContent="flex-end">
				<Grid
					item
					xs={false}>
					<Button
						disableElevation
						disabled={loader}
						type="submit"
						variant="contained"
						color="secondary"
						startIcon={loader
							? <Loader
								visible
								wrapper={{
									sx: {
										padding: '0px',
									},
								}}
								sx={{
									minWidth: '24px',
									maxWidth: '24px',
									minHeight: '24px',
									maxHeight: '24px',
								}} />
							: <SaveIcon />}>
						Save
					</Button>
				</Grid>
				{(entityId
					&& typeof entityId === 'string'
					&& entityId !== '0')
					? <Grid
						item
						xs={false}>
						<Button
							disableElevation
							disabled={loader}
							variant="contained"
							color="error"
							startIcon={<DeleteIcon />}
							onClick={onDelete}>
							{isDeleted
								? 'Delete permanently'
								: 'Delete'}
						</Button>
					</Grid>
					: <React.Fragment />}
			</Grid>
		</form>
	</React.Fragment>;
};

Report = React.memo(Report);
Report.defaultProps = {
};
Report.propTypes = {
};

export default Report;
