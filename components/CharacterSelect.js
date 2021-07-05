import _ from 'lodash';

let optionData = [
	{
		characterName: 'Ben',
		optionType: 'character'
	},
	{
		characterName: 'James',
		optionType: 'character'
	}
];

export default function CharacterSelect() {
	return (
		<div className="grid grid-cols-2 mt-3">
			<p className="text-center mx-3">Please select all the active characters you want in the scene!</p>
			<div>
				<label className="text-gray-600 uppercase">Chacter Selection</label>
				<select className="w-full border-2 border-gray-600" multiple>
					{_.map(optionData, (option) => {
						return (
							<option key={_.concat(option.characterName, option.optionType)}>
								{option.characterName}
							</option>
						);
					})}
				</select>
			</div>
		</div>
	);
}
