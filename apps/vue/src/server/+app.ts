import { createApp } from "@/app/app";
import { html } from "client:page";
import type { App } from "domco";
import { renderToString } from "vue/server-renderer";

export default {
	async fetch(req) {
		const { pathname } = new URL(req.url);

		const { app, router } = await createApp();

		const { matched } = router.resolve(pathname);

		if (matched.length) {
			await router.push(pathname);
			await router.isReady();

			const appHtml = await renderToString(app);

			return new Response(html.replace("%root%", appHtml), {
				headers: {
					"Content-Type": "text/html",
				},
			});
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies App;
