import App from "@/app/App";
import { Injector } from "@robino/html";
import { html } from "client:page";
import type { Handler } from "domco";
import { renderToString, generateHydrationScript } from "solid-js/web";

export const handler: Handler = (req) => {
	const appHtml = renderToString(() => <App url={req.url} />);

	if (appHtml) {
		const page = new Injector(html)
			.head(generateHydrationScript())
			.comment("root", appHtml)
			.toString();

		return new Response(page, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	}

	return new Response("Not found", { status: 404 });
};
