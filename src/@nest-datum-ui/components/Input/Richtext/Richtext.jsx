import React from 'react';
import PropTypes from 'prop-types';
// import { 
// 	EditorState, 
// 	ContentState,
// 	convertFromHTML,
// 	convertToRaw,
// } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import { Editor } from 'react-draft-wysiwyg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

let Richtext = ({
	name,
	error,
	label,
	helperText,
	placeholder,
	value,
	defaultValue,
	disabled,
	required,
	onChange,
	onInput,
	...props
}) => {
	const [ editor, setEditor ] = React.useState(() => null);

	React.useEffect(() => {
		window.watchdog.setCreator((element, config) => {
			return window.CKSource
				.Editor
				.create(element, config)
				.then((editor) => {
					setEditor(editor);

					editor.model.document.on('change', (e) => {
						const value = editor.getData();

						onInput({
							target: {
								value,
							},
							currentTarget: {
								value,
							},
						});
						onChange({
							target: {
								value,
							},
							currentTarget: {
								value,
							},
						});
					});
					return editor;
				});
		});
		window.watchdog.setDestructor((editor) => {
			return editor.destroy();
		});
		window.watchdog.on('error', (error) => {
			console.error( 'Oops, something went wrong!' );
			console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
			console.warn( 'Build id: wizchnyldue6-fvhhj9menvzj' );
			console.error(error);
		});
		window.watchdog
			.create((document.getElementsByClassName(`ckeditor-${name}`))[0], {
				licenseKey: '',
			})
			.catch((error) => {
				console.error( 'Oops, something went wrong!' );
				console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
				console.warn( 'Build id: wizchnyldue6-fvhhj9menvzj' );
				console.error(error);
			});
	}, [
		name,
		setEditor,
		onInput,
		onChange,
	]);

	React.useEffect(() => () => {
		if (editor) {
			editor.destroy();
		}
	}, [
		editor,
	]);

	return <Box>
			{label
				? <Box 
					display="flex"
					style={{
						whiteSpace: 'nowrap',
					}}>
					<Typography
						variant="caption"
						color="primary"
						style={{
							backgroundColor: '#FFF',
							padding: '0 8px 0 4px',
						}}>
						{label} {required ? '*' : ''}
					</Typography>
				</Box>
				: <React.Fragment />}
		<div 
			className={`ckeditor-${name}`}
			dangerouslySetInnerHTML={{ __html: value || defaultValue }} />
		{(error || helperText)
			? <Box
				style={{
					whiteSpace: 'nowrap',
				}}>
				<Typography
					variant="caption"
					color={error
						? 'error'
						: 'textSecondary'}
					style={{
						whiteSpace: 'initial',
						wordWrap: 'break-word',
					}}>
					{error || helperText}
				</Typography>
			</Box>
			: <React.Fragment />}
	</Box>;
};

Richtext = React.memo(Richtext);
Richtext.defaultProps = {
	onChange: (() => {}),
	onInput: (() => {}),
};
Richtext.propTypes = {
	onChange: PropTypes.func,
	onInput: PropTypes.func,
};

export default Richtext;
