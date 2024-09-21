import App from "@/app/App";
import { html } from "client:page";
import type { Handler } from "domco";
import { Injector } from "domco/injector";
import { renderToString, generateHydrationScript } from "solid-js/web";

export const handler: Handler = (req) => {
	const appHtml = renderToString(() => <App url={req.url} />);

	if (appHtml) {
		const page = new Injector(html).comment([
			{ text: "root", children: appHtml },
			{ text: "script", children: generateHydrationScript() },
		]).html;

		return new Response(page, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	}

	return new Response("Not found", { status: 404 });
};
