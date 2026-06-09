# Project Setup Guide

This file explains how to set up the React project locally and get the development workflow running.

## 1. Install Dependencies

From the project root, run:

```bash
npm install
```

This installs all packages listed in `package.json`.

## 2. Run the Development Server

Start the Vite development server with:

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically `http://localhost:5173`.

## 3. Build for Production

Create a production-ready bundle using:

```bash
npm run build
```

The optimized output is written to the `dist/` folder.

## 4. Preview the Production Build

To preview the production build locally, run:

```bash
npm run preview
```

This serves the contents of `dist/` so you can verify the final output.

## 5. Common Project Files

- `package.json` - Project dependencies, scripts, and metadata.
- `vite.config.js` - Vite configuration file.
- `README.md` - Project overview and instructions.
- `node_modules/` - Installed packages (do not commit to Git).

## 6. Recommended Workflow

1. Install packages once after cloning.
2. Use `npm run dev` while developing.
3. Commit source files and documentation, not build artifacts.
4. Use `npm run build` before deployment.
