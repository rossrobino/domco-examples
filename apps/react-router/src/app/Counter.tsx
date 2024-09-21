import { useState, type FC } from "react";

const Counter: FC = () => {
	const [count, setCount] = useState(0);

	return <button onClick={() => setCount((n) => n + 1)}>Count: {count}</button>;
};

export default Counter;
