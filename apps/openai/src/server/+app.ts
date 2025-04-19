// src/server/+app.ts
import * as ai from "@/server/ai";
import { html } from "client:page";
import * as z from "zod";

export default {
	async fetch(req: Request) {
		const url = new URL(req.url);

		if (url.pathname === "/") {
			// the SPA application
			return new Response(html, { headers: { "content-type": "text/html" } });
		}

		// create new route /chat
		if (req.method === "POST" && url.pathname === "/chat") {
			const data = await req.formData();

			// get the message based on the textarea's `name` attribute
			const message = z.string().parse(data.get("message")) ?? "Empty message.";

			// get the id from the hidden input element
			const id = z.string().nullable().parse(data.get("id"));

			const response = await ai.client.responses.create({
				input: message,
				model: "gpt-4.1-nano", // cheapest model
				stream: true,
				previous_response_id: id, // null ok
				store: true, // stored forever?
			});

			const body = new ReadableStream<string>({
				async start(c) {
					// response is AsyncIterable, so a for await...of loop can be used
					for await (const event of response) {
						if (event.type === "response.output_text.delta") {
							// send the change (delta) in output text since the last event
							c.enqueue(event.delta);
						} else if (event.type === "response.completed" && !id) {
							// if the id isn't already there, send it at the end
							c.enqueue(event.response.id);
						}
					}

					c.close(); // end the stream
				},
			}).pipeThrough(new TextEncoderStream()); // to properly comply with the Fetch spec

			return new Response(body, { headers: { "content-type": "text/plain" } });
		}

		return new Response("Not found", { status: 404 });
	},
};
