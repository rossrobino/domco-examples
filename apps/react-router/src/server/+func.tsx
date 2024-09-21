import App from "@/app/App";
import { html } from "client:page";
import type { Handler } from "domco";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

export const handler: Handler = (req) => {
	const { pathname } = new URL(req.url);

	const appHtml = ReactDOMServer.renderToString(
		<StaticRouter location={pathname}>
			<App />
		</StaticRouter>,
	);

	if (appHtml) {
		const page = html.replace("%root%", appHtml);

		return new Response(page, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	}

	return new Response("Not found", { status: 404 });
};
