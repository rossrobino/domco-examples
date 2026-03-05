import App from "@/app";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(
	document,
	<StrictMode>
		<App />
	</StrictMode>,
);
