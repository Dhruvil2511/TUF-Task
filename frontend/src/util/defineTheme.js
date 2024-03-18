import { loader } from "@monaco-editor/react";
const monacoThemes = {
  active4d: "Active4D",
  "all-hallows-eve": "All Hallows Eve",
  amy: "Amy",
  "birds-of-paradise": "Birds of Paradise",
  blackboard: "Blackboard",
  "brilliance-black": "Brilliance Black",
  "brilliance-dull": "Brilliance Dull",
  "chrome-devtools": "Chrome DevTools",
  "clouds-midnight": "Clouds Midnight",
  clouds: "Clouds",
  cobalt: "Cobalt",
  dawn: "Dawn",
  dreamweaver: "Dreamweaver",
  eiffel: "Eiffel",
  "espresso-libre": "Espresso Libre",
  github: "GitHub",
  idle: "IDLE",
  katzenmilch: "Katzenmilch",
  "kuroir-theme": "Kuroir Theme",
  lazy: "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore-soft": "Merbivore Soft",
  merbivore: "Merbivore",
  "monokai-bright": "Monokai Bright",
  monokai: "Monokai",
  "night-owl": "Night Owl",
  "oceanic-next": "Oceanic_Next",
};
  

const defineTheme = (theme) => {
  return new Promise((resolve) => {
    loader.init().then((monaco) => {
      const themeFileName = monacoThemes[theme];
      if (themeFileName) {
        const themeFilePath = `../themes/${themeFileName}.json`;
        import(themeFilePath).then((themeData) => {
          monaco.editor.defineTheme(theme, themeData);
          resolve();
        });
      } else {
        console.error("Theme not found:", theme);
        resolve(); // Resolve the promise even if theme not found
      }
    });
  });
};

export { defineTheme };
