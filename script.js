const STORAGE_KEYS = {
  theme: "sandbox.theme",
  fontScale: "sandbox.fontScale",
  reducedMotion: "sandbox.reducedMotion",
  contrast: "sandbox.contrast",
};

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

function setFontScale(percent) {
  // 100% = 16px
  const base = 16;
  const px = Math.round((base * percent) / 100);
  document.documentElement.style.setProperty("--base-font", `${px}px`);
  localStorage.setItem(STORAGE_KEYS.fontScale, String(percent));
}

function setReducedMotion(on) {
  document.documentElement.setAttribute("data-motion", on ? "reduced" : "full");
  localStorage.setItem(STORAGE_KEYS.reducedMotion, on ? "1" : "0");
}

function setContrast(on) {
  document.documentElement.setAttribute("data-contrast", on ? "on" : "off");
  localStorage.setItem(STORAGE_KEYS.contrast, on ? "1" : "0");
}

function applySavedSettings() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "hemi";
  setTheme(savedTheme);

  const savedFont = Number(localStorage.getItem(STORAGE_KEYS.fontScale) || 100);
  setFontScale(savedFont);

  const savedMotion = localStorage.getItem(STORAGE_KEYS.reducedMotion) === "1";
  setReducedMotion(savedMotion);

  const savedContrast = localStorage.getItem(STORAGE_KEYS.contrast) === "1";
  setContrast(savedContrast);
}

function initControls() {
  // Theme buttons
  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-btn");
      setTheme(theme);
    });
  });

  // Font scale
  const fontScale = document.getElementById("fontScale");
  const fontScaleValue = document.getElementById("fontScaleValue");
  if (fontScale && fontScaleValue) {
    const savedFont = Number(localStorage.getItem(STORAGE_KEYS.fontScale) || 100);
    fontScale.value = String(savedFont);
    fontScaleValue.textContent = `${savedFont}%`;

    fontScale.addEventListener("input", () => {
      const val = Number(fontScale.value);
      setFontScale(val);
      fontScaleValue.textContent = `${val}%`;
    });
  }

  // Reduced motion toggle
  const reduceMotion = document.getElementById("reduceMotion");
  if (reduceMotion) {
    const saved = localStorage.getItem(STORAGE_KEYS.reducedMotion) === "1";
    reduceMotion.checked = saved;
    reduceMotion.addEventListener("change", () => setReducedMotion(reduceMotion.checked));
  }

  // Contrast toggle
  const contrastToggle = document.getElementById("contrastToggle");
  if (contrastToggle) {
    const saved = localStorage.getItem(STORAGE_KEYS.contrast) === "1";
    contrastToggle.checked = saved;
    contrastToggle.addEventListener("change", () => setContrast(contrastToggle.checked));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applySavedSettings();
  initControls();
});
