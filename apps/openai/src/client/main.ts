// get references to our elements
const form = document.querySelector("form")!;
const assistant = document.querySelector("#assistant")!;

// add a submit listener
form.addEventListener("submit", async function (e) {
	// prevent full page reload, instead handle with JS
	e.preventDefault();

	// set a loading state
	assistant.innerHTML = "Loading...";

	const { action, method } = form; // values from the corresponding attributes

	// creates FormData with all the elements from the form
	const body = new FormData(form);

	// make a request to our API
	const res = await fetch(action, {
		method,
		body,
	});

	// obtain the reader from the body stream
	const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

	if (!res.ok || !reader) {
		assistant.innerHTML = "nope";
		return;
	}

	// clear loading state
	assistant.innerHTML = "";

	while (true) {
		// read each value from the stream
		const { done, value } = await reader.read();

		if (done) break;

		const idPrefix = "resp_";

		if (value.includes(idPrefix)) {
			// parse the response id
			const [rest, id] = value.split(idPrefix);

			// in case it was sent with something before
			assistant.innerHTML += rest;

			// append a new hidden input to the form with the value of the id
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = "id";
			input.value = idPrefix + id;

			form.append(input);
		} else if (value) {
			// add each chunk to the assistant <div>
			assistant.innerHTML += value;
		}
	}
});
