import Counter from "@/app/counter";
import Delay from "@/app/delay";
import { src } from "client:script";
import { Suspense } from "react";

export default function App() {
	return (
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href="/circle.svg" />
				<title>domco-examples</title>
				<meta name="description" content="domco-examples" />
				<link
					rel="stylesheet"
					href={import.meta.env.DEV ? "/client/style.css" : src.style[0]}
				/>
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
