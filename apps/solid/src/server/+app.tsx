import App from "@/app/App";
import { html } from "client:page";
import { generateHydrationScript, renderToString } from "solid-js/web";

export default {
	fetch(req: Request) {
		const appHtml = renderToString(() => <App url={req.url} />);

		if (appHtml) {
			const [head, middle, body] = html.split("%SSR%");

			return new Response(
				[head, generateHydrationScript(), middle, appHtml, body].join(""),
				{ headers: { "Content-Type": "text/html" } },
			);
		}

		return new Response("Not found", { status: 404 });
	},
};
