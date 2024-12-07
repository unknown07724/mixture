const Mixture = {
  variables: {
    userAgent: "Mixture/1.0 (Custom Web Engine)",
    currentPage: "",
    history: [],
    historyIndex: -1,
    theme: "light", // Default theme
    devToolsVisible: false,
  },

  themes: {
    light: {
      "--bg-color": "#ffffff",
      "--text-color": "#000000",
    },
    dark: {
      "--bg-color": "#121212",
      "--text-color": "#ffffff",
    },
    aqua: {
      "--bg-color": "#00cfff",
      "--text-color": "#ffffff",
    },
    eclipse: {
      "--bg-color": "#7b2cbf",
      "--text-color": "#ffffff",
    }
  },

  navigator: {
    product: "Mixture",
    userAgent: "Mixture/1.0 (Custom Web Engine)",
  },

  pipelines: {
    async lizard(html, baseURL) {
      const parser = new DOMParser();
      const documentBody = parser.parseFromString(html, "text/html").body;

      // Existing pipelines for images, CSS, scripts, and links...
      // (from previous example)

      return documentBody;
    },
  },

  loadPage(url) {
    const viewport = document.getElementById("viewport");
    const statusBar = document.getElementById("status-bar");

    // Similar to previous implementation...
  },

  loadErrorPage(code) {
    // Similar to previous implementation...
  },

  toggleDevTools() {
    const devTools = document.getElementById("dev-tools");
    this.variables.devToolsVisible = !this.variables.devToolsVisible;
    devTools.style.display = this.variables.devToolsVisible ? "block" : "none";
  },

  logToDevTools(message, type = "log") {
    const consoleOutput = document.getElementById("dev-tools-output");
    const logMessage = document.createElement("div");
    logMessage.className = `console-${type}`;
    logMessage.textContent = message;
    consoleOutput.appendChild(logMessage);
  },

  switchTheme(theme) {
    const root = document.documentElement;
    Object.assign(root.style, this.themes[theme]);
    this.variables.theme = theme;
  },

  setupEventListeners() {
    // Existing event listeners...

    // Dev Tools Button
    document.getElementById("dev-tools-btn").addEventListener("click", () => {
      this.toggleDevTools();
    });

    // Theme Selector in Settings
    document.getElementById("theme-selector").addEventListener("change", (event) => {
      this.switchTheme(event.target.value);
    });

    // Capture console.log calls
    const originalLog = console.log;
    console.log = (...args) => {
      this.logToDevTools(args.join(" "));
      originalLog(...args);
    };
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Mixture.setupEventListeners();
});

