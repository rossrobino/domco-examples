import Counter from "@/app/counter";
import Delay from "@/app/delay";
import { Suspense } from "react";

export default function App(props: { head?: React.JSX.Element }) {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href="/circle.svg" />
				<title>domco-examples</title>
				<meta name="description" content="domco-examples" />
				{props.head}
			</head>
			<body className="prose">
				<h1>domco + React</h1>

				<Suspense fallback={<p>Loading...</p>}>
					<Delay ms={500} />
				</Suspense>

				<Counter />

				<Suspense fallback={<p>Loading...</p>}>
					<Delay ms={200} />
				</Suspense>
			</body>
		</html>
	);
}
