import App from "@/app";
import "@/client/style.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

hydrateRoot(
	document,
	<StrictMode>
		<App />
	</StrictMode>,
);
