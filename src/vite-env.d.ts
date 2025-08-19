// FILE: src/vite-env.d.ts

/// <reference types="vite/client" />

// Add this declaration to inform TypeScript about Vite's '?raw' imports.
// This tells the type checker that importing a file with this suffix
// will result in a module that default-exports a string.
declare module '*?raw' {
  const content: string;
  export default content;
}
