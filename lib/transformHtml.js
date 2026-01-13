export function transformAboutHtml(html) {
  if (typeof window === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const h2 = doc.querySelector("h2");

  if (h2) {
    const img = h2.querySelector("img");
    const text = h2.textContent?.trim();

    if (img) {
      // Create wrapper
      const wrapper = doc.createElement("div");
      wrapper.className =
        "flex flex-col md:flex-row gap-6 items-center my-10";

      // Left image div
      const imageDiv = doc.createElement("div");
      imageDiv.className = "w-full md:w-1/2";
      imageDiv.innerHTML = `
        <img src="${img.src}" class="w-full max-w-sm mx-auto" />
      `;

      // Right content div
      const contentDiv = doc.createElement("div");
      contentDiv.className = "w-full md:w-1/2";
      contentDiv.innerHTML = `
        <h2 class="text-2xl font-semibold">${text}</h2>
      `;

      wrapper.appendChild(imageDiv);
      wrapper.appendChild(contentDiv);

      h2.replaceWith(wrapper);
    }
  }

  return doc.body.innerHTML;
}
