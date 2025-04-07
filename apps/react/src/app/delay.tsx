import { use } from "react";

export default function Delay(props: { ms: number }) {
	use(new Promise((res) => setTimeout(res, props.ms)));

	return <p>Delayed for {props.ms}ms</p>;
}
