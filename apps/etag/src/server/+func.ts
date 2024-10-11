import { html } from "client:page";
import type { Handler } from "domco";

export const handler: Handler = (req) => {
	const { pathname } = new URL(req.url);

	if (pathname === "/") {
		const eTag = `"${djb2(html)}"`;
		const notModified = eTag === req.headers.get("If-None-Match");

		return new Response(notModified ? null : html, {
			status: notModified ? 304 : 200,
			headers: {
				"Content-Type": "text/html",
				ETag: eTag,
			},
		});
	} else if (pathname === "/json") {
		const jsonString = JSON.stringify({ hello: "world" });

		const eTag = `"${djb2(jsonString)}"`;
		const notModified = eTag === req.headers.get("If-None-Match");

		return new Response(notModified ? null : jsonString, {
			status: notModified ? 304 : 200,
			headers: {
				"Content-Type": "application/json",
				ETag: eTag,
			},
		});
	}

	return new Response("Not found.", { status: 404 });
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
