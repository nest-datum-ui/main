import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import MuiTable from '@mui/material/Table';
import StyledBoxWrapper from './StyledBoxWrapper.jsx';

let Table = ({ children }) => {
	return <React.Fragment>
		<StyledBoxWrapper>
			<TableContainer>
				<MuiTable>
					{children}
				</MuiTable>
			</TableContainer>
		</StyledBoxWrapper>
	</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
};
Table.propTypes = {
};

export default Table;
