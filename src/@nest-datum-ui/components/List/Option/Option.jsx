import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TypographyTitle from '@nest-datum-ui/components/Typography/Title';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import Loader from '@nest-datum-ui/components/Loader';
import Item from './Item';

let Option = ({
	entityId,
	title,
	relationTableName,
	valueTableName,
	onChange,
	onAdd,
	onDrop,
	loader,
	children,
}) => {
	return <React.Fragment>
		<Loader visible={loader} />
		{(!loader && (children || []).length > 0)
			&& <Box>
				{title
					&& <TypographyTitle>
						{title}
					</TypographyTitle>}
				{children.map((item, index) => <React.Fragment key={item.id}>
					<Box py={2}>
						<Typography component="div">
							{item.name}
						</Typography>
						{item[relationTableName].map((option, optionIndex) => ((option[valueTableName].length === 0)
							? ([{
								id: uuidv4(),
								content: item.defaultValue ?? '',
								entityId,
								entityOptionId: item[relationTableName][0].id,
							}])
							: option[valueTableName]).map((optionValue, optionValueIndex) => <Item 
								{ ...item }
								content={optionValue.content}
								key={optionValue.id}
								relationTableName={relationTableName}
								valueTableName={valueTableName}
								index={index}
								option={option}
								optionValue={optionValue}
								optionIndex={optionIndex}
								optionValueIndex={optionValueIndex}
								optionLength={item[relationTableName].length}
								optionValueLength={option[valueTableName].length}
								onChange={onChange}
								onAdd={onAdd}
								onDrop={onDrop} />
						))}
						{item.description
							&& <Box pt={1}>
								<TypographyCaption>
									{item.description}
								</TypographyCaption>
							</Box>}
					</Box>
				</React.Fragment>)}
			</Box>}
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
	onChange: () => {},
	onAdd: () => {},
	onDrop: () => {},
};
Option.propTypes = {
	entityId: PropTypes.string.isRequired,
	title: PropTypes.string,
	relationTableName: PropTypes.string.isRequired,
	valueTableName: PropTypes.string.isRequired,
	loader: PropTypes.bool,
	children: PropTypes.array,
	onChange: PropTypes.func,
	onAdd: PropTypes.func,
	onDrop: PropTypes.func,
};

export default Option;
