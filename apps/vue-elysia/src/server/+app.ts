import { createApp } from "@/app/app";
import * as page from "client:page";
import { Elysia } from "elysia";
import { renderToString } from "vue/server-renderer";

const app = new Elysia()
	.onRequest(async ({ request }) => {
		const { pathname } = new URL(request.url);

		const { app, router } = await createApp();

		const { matched } = router.resolve(pathname);

		if (!matched.length) return;

		await router.push(pathname);
		await router.isReady();

		const appHtml = await renderToString(app);

		return new Response(page.html.replace("%root%", appHtml), {
			headers: { "Content-Type": "text/html; charset=utf-8" },
		});
	})
	.get("/api", () => {
		return { hello: "vue" };
	});

export default app;
