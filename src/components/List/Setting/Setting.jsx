import React from 'react';
import TableSetting from 'components/Table/Setting';
import StyledWrapper from './Styled/Wrapper.jsx';

let Setting = (props) => {
	return <StyledWrapper>
		<TableSetting />
	</StyledWrapper>;
};

Setting = React.memo(Setting);
Setting.defaultProps = {
};
Setting.propTypes = {
};

export default Setting;
