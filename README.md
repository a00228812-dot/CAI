# CAI — Miramos el Mismo Cielo (Plataforma de Concientización)

Plataforma interactiva y narrativa on-scroll para la concientización sobre el espectro autista y la difusión de la causa de **CAI (Centro de Atención Integral)**. Inspirada en el formato editorial y humano de *"BBVA Aprendemos Juntos"*.

---

## 🚀 Despliegue en Render (Static Site)

Esta aplicación está optimizada como un **Static Site** para ser desplegada en [Render](https://render.com) en cuestión de segundos:

1. Ve a tu dashboard de Render y haz clic en **New +** -> **Static Site**.
2. Conecta tu repositorio de GitHub.
3. Configura los siguientes campos:
   - **Name**: `impulsa-cai` (o el nombre que elijas)
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Haz clic en **Create Static Site**. ¡Listo!

---

## 🛠️ Tecnologías Utilizadas

- **React 18** + **TypeScript**
- **Vite** (bundler ultra rápido)
- **Tailwind CSS**
- **WebGL Fragment Shaders**
- **Three.js** (Cilindro 3D interactivo)
- **HTML5 Video & Web Audio API** (Paisaje sonoro inmersivo)

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build localmente
npm run preview
```

