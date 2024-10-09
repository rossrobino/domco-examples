import { html } from "client:page";
import type { Handler } from "domco";

export const prerender = ["/"];

export const handler: Handler = (req) => {
	const eTag = `"${djb2(html)}"`;
	const notModified = eTag === req.headers.get("If-None-Match");

	return new Response(notModified ? null : html, {
		status: notModified ? 304 : 200,
		headers: {
			"Content-Type": "text/html",
			ETag: eTag,
		},
	});
};

const djb2 = (...values: (string | ArrayBufferView)[]) => {
	let hash = 5381;

	for (const value of values) {
		if (typeof value === "string") {
			let i = value.length;
			while (i) hash = (hash * 33) ^ value.charCodeAt(--i);
		} else if (ArrayBuffer.isView(value)) {
			const buffer = new Uint8Array(
				value.buffer,
				value.byteOffset,
				value.byteLength,
			);
			let i = buffer.length;
			while (i) hash = (hash * 33) ^ buffer[--i]!;
		} else {
			throw new TypeError("value must be a string or an ArrayBuffer view");
		}
	}

	return (hash >>> 0).toString(36);
};
