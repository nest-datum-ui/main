import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import MuiTable from '@mui/material/Table';
import StyledWrapper from './Styled/Wrapper.jsx';

let Table = ({ children }) => {
	return <StyledWrapper>
		<TableContainer>
			<MuiTable>
				{children}
			</MuiTable>
		</TableContainer>
	</StyledWrapper>;
};

Table = React.memo(Table);
Table.defaultProps = {
};
Table.propTypes = {
};

export default Table;
