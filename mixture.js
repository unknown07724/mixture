const Mixture = {
  variables: {
    userAgent: "Mixture/1.0",
    currentPage: "",
    history: [],
    historyIndex: -1,
  },

  pipelines: {
    lizard(html) {
      const parser = new DOMParser();
      return parser.parseFromString(html, "text/html").body;
    },
  },

  loadErrorPage(code) {
    const errorMessages = {
      404: "Page Not Found",
      410: "The page you are trying to access is gone.",
      500: "Internal Server Error",
      400: "Bad Request",
    };
    const viewport = document.getElementById("viewport");
    viewport.innerHTML = `
      <div class="error-page">
        <h1>${code}</h1>
        <p>${errorMessages[code] || "An error occurred."}</p>
        <button onclick="location.reload()">Back to Home</button>
      </div>
    `;
  },

  async loadPage(url) {
    const viewport = document.getElementById("viewport");
    const statusBar = document.getElementById("status-bar");
    statusBar.textContent = `Loading ${url}...`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        this.loadErrorPage(response.status);
        return;
      }

      const html = await response.text();
      const dom = this.pipelines.lizard(html);

      viewport.innerHTML = "";
      viewport.appendChild(dom);
      statusBar.textContent = "Done.";
    } catch (error) {
      this.loadErrorPage(500);
    }
  },

  setupEventListeners() {
    const goBtn = document.getElementById("go-btn");
    const urlBar = document.getElementById("url-bar");

    goBtn.addEventListener("click", () => {
      const url = urlBar.value.startsWith("http") ? urlBar.value : `https://${urlBar.value}`;
      this.loadPage(url);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Mixture.setupEventListeners();
});
