import App from "@/app/App";
import { html } from "client:page";
import { renderToString, generateHydrationScript } from "solid-js/web";

export default {
	fetch(req: Request) {
		const appHtml = renderToString(() => <App url={req.url} />);

		if (appHtml) {
			const parts = html.split("%SSR%");

			return new Response(
				[parts[0], generateHydrationScript(), parts[1], appHtml, parts[2]].join(
					"",
				),
				{
					headers: {
						"Content-Type": "text/html",
					},
				},
			);
		}

		return new Response("Not found", { status: 404 });
	},
};
