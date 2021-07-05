import React, { ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';

let characterMentions = [
	{
		name: 'Ben',
		link: ''
		// avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'
	},
	{
		name: 'James',
		link: ''
		// avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg'
	}
];

export default function SceneTextEditor() {
	const ref = useRef(null);

	const emptyContentState = convertFromRaw({
		entityMap: {},
		blocks: [
			{
				text: '',
				key: 'foo',
				type: 'unstyled',
				entityRanges: []
			}
		]
	});
	const [ editorState, setEditorState ] = React.useState(EditorState.createWithContent(emptyContentState));
	const [ open, setOpen ] = useState(false);
	const [ suggestions, setSuggestions ] = useState(characterMentions);

	const { MentionSuggestions, plugins } = useMemo(() => {
		const mentionPlugin = createMentionPlugin();
		// eslint-disable-next-line no-shadow
		const { MentionSuggestions } = mentionPlugin;
		// eslint-disable-next-line no-shadow
		const plugins = [ mentionPlugin ];
		return { plugins, MentionSuggestions };
	}, []);

	const onOpenChange = useCallback((_open) => {
		setOpen(_open);
	}, []);
	const onSearchChange = useCallback(({ value }) => {
		console.log(value);
		setSuggestions(defaultSuggestionsFilter(value, characterMentions));
	}, []);

	return (
		<div
			className={editorStyles.editor}
			onClick={() => {
				if (ref.current) ref.current.focus();
			}}
		>
			<Editor
				editorKey={'editor'}
				editorState={editorState}
				onChange={setEditorState}
				plugins={plugins}
				ref={ref}
			/>
			<MentionSuggestions
				open={open}
				onOpenChange={onOpenChange}
				suggestions={suggestions}
				onSearchChange={onSearchChange}
				onAddMention={() => {
					// get the mention object selected
				}}
			/>
		</div>
	);
}
