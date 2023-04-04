import styled from 'styled-components';
import TableBody from '@mui/material/TableBody';

const Wrapper = styled(TableBody)`
	& .progress-table__tr-wrapper {
		${({ visible }) => visible
			? ``
			: `
				height: 0px;

				& .progress-table__td-space {
					height: 0px !important;
					padding: 0px !important;
				}
			`}

		& .progress-table__td-animation {
			position: absolute;
			width: 100%;
		}
		& .progress-table__td-space {
			height: 160px;
			min-height: 160px;
			max-height: 160px;
			padding-top: 48px;
			padding-bottom: 48px;
		}
	}
`;

export default Wrapper;