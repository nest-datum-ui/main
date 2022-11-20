import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormReset from '@nest-datum-ui/sso/components/Form/Reset';

let Reset = () => {
	return <React.Fragment>
		<Box 
			position="fixed"
			top="0px"
			left="0px"
			width="100%"
			height="100%">
			<Grid 
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					height: '100%',
				}}>
				<Grid
					item
					xs={12}
					sm={10}
					md={8}
					lg={6}>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						minHeight="400px">
						<Box>
							<FormReset />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	</React.Fragment>
};

Reset = React.memo(Reset);
Reset.defaultProps = {
};
Reset.propTypes = {
};

export default Reset;
