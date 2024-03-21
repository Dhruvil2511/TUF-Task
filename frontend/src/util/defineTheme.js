import { loader } from "@monaco-editor/react";
const monacoThemes = {
  "all-hallows-eve": "All Hallows Eve",
  "amy": "Amy",
  "birds-of-paradise": "Birds of Paradise",
  "blackboard": "Blackboard",
  "brilliance-black": "Brilliance Black",
  "clouds-midnight": "Clouds Midnight",
  "cobalt": "Cobalt",
  "dawn": "Dawn",
  "github-dark": "GitHub Dark",
  "github": "GitHub",
  "idle": "IDLE",
  "lazy": "LAZY",
  "magicwb--amiga-": "MagicWB (Amiga)",
  "merbivore": "Merbivore",
  "monokai": "Monokai",
  "night-owl": "Night Owl",
  "nord": "Nord",
  "oceanic-next": "Oceanic_Next"
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
        resolve(); 
      }
    });
  });
};

export { defineTheme };
