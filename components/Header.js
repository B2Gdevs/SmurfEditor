import Link from 'next/link';

export default function Header() {
	return (
		<div className="grid grid-cols-8 py-4 bg-purple-700">
			<div className="col-span-1 text-2xl font-mono text-white">Logo</div>
			<div className="col-span-5">
				<Link href="/">
					<a className=" no-underline mx-3 text-white">Home</a>
				</Link>
				<Link href="/editor/editor">
					<a className="no-underline mx-3 text-white ">Editor</a>
				</Link>
			</div>
			<div className="col-span-2 text-right">
				<Link href="/">
					<a className=" no-underline mx-2 text-white">Register</a>
				</Link>
				<Link href="/editor/editor">
					<a className=" no-underline mx-2 text-white">Login</a>
				</Link>
			</div>
		</div>
	);
}
