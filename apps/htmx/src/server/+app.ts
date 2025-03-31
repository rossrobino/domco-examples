import { html } from "client:page";
import type { App } from "domco";

export default {
	fetch(req) {
		const { pathname } = new URL(req.url);

		if (pathname === "/") {
			return new Response(html, {
				headers: {
					"Content-Type": "text/html",
				},
			});
		} else if (pathname === "/clicked") {
			return new Response("Success!", {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies App;
