/* @refresh reload */
import { Router, Route } from "@solidjs/router";
import { lazy, type Component } from "solid-js";

const Counter = lazy(() => import("./Counter"));

const App: Component<{ url?: string }> = ({ url }) => {
	return (
		<Router root={Layout} url={url ? url : ""}>
			<Route path="/" component={() => <h1>Solid</h1>} />
			<Route path="/counter" component={Counter} />
		</Router>
	);
};

const Layout: Component<any> = ({ children }) => {
	return (
		<>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/counter">Counter</a>
				</li>
			</ul>
			{children}
		</>
	);
};

export default App;
