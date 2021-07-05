import 'tailwindcss/tailwind.css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
import editorStyles from './SimpleMentionEditor.module.css';

let optionData = [
	{
		value: {
			sceneName: 'scene 1',
			optionType: 'scene'
		},
		label: 'scene 1 display name'
	},
	{
		value: {
			sceneName: 'scene 2',
			optionType: 'scene'
		},
		label: 'scene 2 display name'
	}
];

let scene = {
	options: {},
	display: 'Sample Text',
	items: []
};

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

/*
This is the editor for any 1 scene.  This is where the user will be working when creating the actual scene.

The canvas is coming later and that will be where the user will link their scenes.
*/
export default function SceneEditor() {
	const handleChange = (options) => {
		setSelectedOptions(options);
	};

	let formHandler = () => {
		let scene = {
			options: selectedOptions,
			display: editorState.getCurrentContent().getPlainText(),
			items: []
		};

		// This will need to be collected and added to a games list of scenes!
		console.log(scene);
	};

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
		setSuggestions(defaultSuggestionsFilter(value, characterMentions));
	}, []);

	const [ selectedOptions, setSelectedOptions ] = useState([]);
	const [ editorState, setEditorState ] = React.useState(EditorState.createWithContent(emptyContentState));
	const [ open, setOpen ] = useState(false);
	const [ suggestions, setSuggestions ] = useState(characterMentions);
	return (
		<form className="w-full max-w-sm">
			<div className="grid grid-cols-1">
				<div>
					<label htmlFor="name">Scene Name</label>
					<input
						type="name"
						name="name"
						id="name"
						placeholder="Scene Name"
						className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
					/>
				</div>

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

				<div className="grid grid-cols-2 mt-3">
					<div>
						<label className="text-gray-600 uppercase">Option Selection</label>

						<Select
							instanceId={1}
							className="w-full border-2 border-gray-600"
							isMulti={true}
							options={optionData}
							closeMenuOnSelect={false}
							onChange={handleChange}
						/>
					</div>
					<p className="text-center mx-3 ">
						Please select all the options the player can select in this scene!
					</p>
				</div>
			</div>

			<button type="button" onClick={formHandler}>
				Create Scene!
			</button>
		</form>
	);
}
