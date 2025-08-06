import { html, signal } from "isum/preactive";

const count = signal(0);

export const App = () => html`
	<h1>isum</h1>

	<button type="button" onclick=${() => count.value++}>
		Count: ${count.value}
	</button>
`;
