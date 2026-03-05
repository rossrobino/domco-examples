import App from "@/app";
import * as script from "client:script";
import * as style from "client:style";
import { StrictMode } from "react";
import { renderToReadableStream } from "react-dom/server.edge";

export default {
	async fetch(_req: Request) {
		return new Response(
			await renderToReadableStream(
				<StrictMode>
					<App head={<link rel="stylesheet" href={style.src.style[0]} />} />
				</StrictMode>,
				{ bootstrapModules: script.src.module },
			),
			{ headers: { "content-type": "text/html" } },
		);
	},
};
