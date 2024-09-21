import Counter from "./Counter";
import type { FC } from "react";
import { Routes, Route, Link } from "react-router-dom";

const App: FC = () => {
	return (
		<>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/counter">Counter</Link>
				</li>
			</ul>
			<Routes>
				<Route path="/" Component={() => <h1>React Router</h1>} />
				<Route path="/counter" Component={Counter} />
				<Route path="*" Component={() => <h1>Not Found</h1>} />
			</Routes>
		</>
	);
};

export default App;
