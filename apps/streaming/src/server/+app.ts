import streamHtmlElement from "../client/stream-html?raw";
import { html } from "client:page";
import type { App } from "domco";

export default {
	fetch() {
		// split html into two chunks
		const [startChunk, endChunk] = html.split("%stream%");

		// create a new stream of strings
		const body = new ReadableStream<string>({
			async start(controller) {
				// send the first chunk and the script tag
				controller.enqueue(startChunk + streamHtmlScript);

				// an array of loaders to load asynchronously
				const loaders = [
					async () => {
						await randomDelay();
						return streamHtml(".greeting", "<h2>Greetings!</h2>");
					},
					async () => {
						await randomDelay();
						return streamHtml("#message", "<p>Message</p>");
					},
					async () => {
						await randomDelay();
						return streamHtml("load-data", "<p><code>1234</code></p>");
					},
				];

				await Promise.all(
					loaders.map(async (loader) => {
						const chunk = await loader();
						controller.enqueue(chunk);
					}),
				);

				// send the last chunk (other half of original html)
				controller.enqueue(endChunk);

				controller.close();
			},
		});

		// return the stream as the response body
		return new Response(body, {
			headers: {
				"Content-Type": "text/html",
			},
		});
	},
} satisfies App;

const randomDelay = () => {
	const ms = Math.floor(Math.random() * 3000);
	return new Promise((resolve) => setTimeout(resolve, ms));
};

const escape = (unsafe: string) =>
	unsafe
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

/** serialize html into the StreamHtml custom element */
const streamHtml = (target: string, html: string) =>
	`<stream-html target="${target}" html="${escape(html)}"></stream-html>`;

const streamHtmlScript = `<script>${streamHtmlElement}</script>`;
