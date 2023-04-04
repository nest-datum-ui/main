import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainIncludes from '@nest-datum-ui/components/Store/main/selectors/includes.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TypographyTable from '@nest-datum-ui/components/Typography/Table';
import TypographyDateTable from '@nest-datum-ui/components/Typography/Date/Table';
import LensaTypographyReportStatus from '@nest-datum-ui-lib/lensa/components/Typography/Report/Status';
// import FilesPaperById from '@nest-datum-ui-lib/files/components/Paper/ById';
import MenuContext from '@nest-datum-ui/components/Menu/Context';

let Item = ({
	bulkDeletion,
	id,
	reportStatusId,
	email,
	firstName,
	city,
	state,
	language,
	customerCategory,
	jobTitle,
	fileId,
	createdAt,
	updatedAt,
	isDeleted,
	onClose,
	onDrop,
	onRestore,
	onMenu,
	onCheck,
	storePath,
}) => {
	const checked = useSelector(selectorMainIncludes([ ...storePath, 'selected' ], id));

	return <React.Fragment>
		<TableRow key={id}>
			{(bulkDeletion && utilsCheckArr(storePath))
				&& <TableCell
					padding="checkbox"
					sx={{ minWidth: '1%' }}>
					<Checkbox 
						checked={checked}
						onChange={onCheck} />
				</TableCell>}
			<TableCell sx={{ minWidth: '16%' }}>
				<TypographyTable
					to={`/lensa/report/${id}`}
					isDeleted={isDeleted}>
					{id}
				</TypographyTable>
			</TableCell>
			<TableCell sx={{ minWidth: '16%' }}>
				{firstName
					&& <Typography
						component="div"
						variant="body2">
						<b>{firstName}</b>
					</Typography>}
				{email
					&& <Typography 
						component="div"
						variant="body2">
						{email}
					</Typography>}
			</TableCell>
			<TableCell sx={{ minWidth: '16%' }}>
				{state
					&& <Typography component="div">
						<b>state:</b> {state}
					</Typography>}
				{city
					&& <Typography component="div">
						<b>city:</b> {city}
					</Typography>}
				{language
					&& <Typography component="div">
						<b>language:</b> {language}
					</Typography>}
			</TableCell>
			<TableCell sx={{ minWidth: '22%' }}>
				{customerCategory
					&& <Typography component="div">
						<b>customer category:</b> {customerCategory}
					</Typography>}
				{jobTitle
					&& <Typography component="div">
						<b>title:</b> {jobTitle}
					</Typography>}
			</TableCell>
			<TableCell sx={{ minWidth: '12%' }}>
				<LensaTypographyReportStatus>
					{reportStatusId}
				</LensaTypographyReportStatus>
			</TableCell>
			<TableCell sx={{ width: '16%' }}>
				<TypographyDateTable
					createdAt={createdAt}
					updatedAt={updatedAt} />
			</TableCell>
			<TableCell sx={{ width: '1%' }}>
				<IconButton onClick={onMenu}>
					<MoreVertIcon />
				</IconButton>
				<MenuContext 
					id={id}
					isDeleted={isDeleted}
					onClose={onClose}
					onDrop={onDrop}
					onRestore={onRestore} />
			</TableCell>
		</TableRow>
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	bulkDeletion: false,
	onCheck: () => {},
};
Item.propTypes = {
	bulkDeletion: PropTypes.bool,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	reportStatusId: PropTypes.string,
	email: PropTypes.string,
	firstName: PropTypes.string,
	city: PropTypes.string,
	state: PropTypes.string,
	language: PropTypes.string,
	customerCategory: PropTypes.string,
	jobTitle: PropTypes.string,
	fileId: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	isDeleted: PropTypes.bool,
	onClose: PropTypes.func,
	onDrop: PropTypes.func,
	onRestore: PropTypes.func,
	onMenu: PropTypes.func,
	onCheck: PropTypes.func,
	storePath: PropTypes.array,
};

export default Item;
