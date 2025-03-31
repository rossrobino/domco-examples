import { html } from "client:page";
import type { App } from "domco";

export default {
	fetch(req) {
		const url = new URL(req.url);

		if (url.pathname === "/") {
			return new Response(html, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies App;
