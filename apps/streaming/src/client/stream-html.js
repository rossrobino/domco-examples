class StreamHtml extends HTMLElement {
	connectedCallback() {
		// selector for targets that needs the streamed data
		const selector = this.getAttribute("target") ?? "";

		document.querySelectorAll(selector).forEach((target) => {
			// set the target's html to the contents of the `html` attribute
			target.innerHTML = this.getAttribute("html") ?? "";
		});
	}
}

customElements.define("stream-html", StreamHtml);
