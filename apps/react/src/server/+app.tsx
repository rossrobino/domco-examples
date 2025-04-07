import App from "@/app";
import { src } from "client:script";
import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server.edge";

export default {
	async fetch(_req: Request) {
		return new Response(
			await renderToReadableStream(
				<StrictMode>
					<App />
				</StrictMode>,
				{ bootstrapModules: src.module },
			),
			{
				headers: {
					"content-type": "text/html",
				},
			},
		);
	},
};
