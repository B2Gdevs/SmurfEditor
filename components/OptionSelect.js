import _ from 'lodash';
import { useRef, useState } from 'react';
import Select from 'react-select';

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

export default function OptionSelect({ innerRef }) {
	const [ selectedOptions, setSelectedOptions ] = useState([]);

	const handleChange = (options) => {
		setSelectedOptions(options);
	};

	return (
		<div className="grid grid-cols-2 mt-3">
			<div>
				<label className="text-gray-600 uppercase">Option Selection</label>

				<Select
					className="w-full border-2 border-gray-600"
					isMulti={true}
					options={optionData}
					closeMenuOnSelect={false}
					onChange={handleChange}
				/>
				{/*
				<select ref={innerRef} multiple>
					{_.map(optionData, (option) => {
						return (
							<option key={_.concat(option.sceneName, option.optionType)} value={option}>
								{option.sceneName}
							</option>
						);
					})}
				</select> */}
			</div>
			<p className="text-center mx-3 ">Please select all the options the player can select in this scene!</p>
		</div>
	);
}
