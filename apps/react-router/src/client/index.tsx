import App from "@/app/App";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(
	document.querySelector("#root")!,
	<BrowserRouter>
		<App />
	</BrowserRouter>,
);
