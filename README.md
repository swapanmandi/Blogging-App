# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


###### for production   #######

# change proxy on vite.config.js :  
"http://localhost:3000"
"https://blogpress-chiu.onrender.com"

# change backend api on .env
VITE_BACKEND_API = https://blogging-app-backend-dfio.onrender.com/api/v1
VITE_BACKEND_API = http://localhost:3000/api/v1

# change cors origin on backend/.env

CORS_ORIGIN = http://localhost:5173
CORS_ORIGIN = https://blogpress-chiu.onrender.com