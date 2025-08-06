import { App } from "@/app";
import { html } from "client:page";
import { default as initSSR, render } from "isum/preactive";

export default {
	fetch(req: Request) {
		const url = new URL(req.url);

		if (url.pathname === "/") {
			const { document } = initSSR(html);

			render(document.getElementById("root"), App);

			return new Response(document.toString(), {
				headers: { "content-type": "text/html" },
			});
		}

		return new Response("Not found", { status: 404 });
	},
	prerender: ["/"],
};
