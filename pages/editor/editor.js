import Link from 'next/link';
import Head from 'next/head';
import SceneEditor from './scene-editor';

export default function Editor() {
	return (
		<div>
			<Head>
				<title>The Smurf Editor</title>
			</Head>
			<div className="grid grid-cols-3">
				<Link href="/editor/scene-editor">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
						SceneEditor
					</button>
				</Link>
				<Link href="/editor/scene-editor">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
						CharacterEditor
					</button>
				</Link>
				<Link href="/editor/scene-editor">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
						ItemEditor
					</button>
				</Link>
			</div>
			<h2>
				<Link href="/">Back to home</Link>
			</h2>
		</div>
	);
}
