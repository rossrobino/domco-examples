import { createSignal, type Component } from "solid-js";

const Counter: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<button onClick={() => setCount((n) => n + 1)}>Count: {count()}</button>
	);
};

export default Counter;
