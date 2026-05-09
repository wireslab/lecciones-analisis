# Trading Academy CMS

Un Sistema de Gestión de Contenido (CMS) local diseñado para almacenar, organizar y visualizar lecciones interactivas de análisis técnico construidas en React/Canvas y generadas por Gemini.

## 🚀 Características

- **Carga de Código:** Formulario intuitivo con editor Monaco (VS Code) para pegar el código de Gemini.
- **Renderizado en Vivo:** Visualización interactiva instantánea usando Sandpack.
- **Organización Inteligente:** Filtrado por categorías y búsqueda por etiquetas/título.
- **Persistencia Local:** Base de datos SQLite gestionada con Prisma.
- **Dockerizado:** Entorno consistente y fácil de desplegar con Docker Compose.

## 🛠️ Tecnologías

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de Datos:** SQLite + Prisma ORM
- **Editor:** @monaco-editor/react
- **Runtime de Código:** @codesandbox/sandpack-react
- **Iconos:** Lucide React

## 📋 Requisitos Previos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🏃 Guía de Inicio Rápido

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repo>
   cd lecciones_analisis
   ```

2. **Levantar el entorno con Docker:**
   ```bash
   docker-compose up --build
   ```

3. **Acceder a la aplicación:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 💡 Flujo de Trabajo con Gemini

1. **Solicita una lección:** Pide a Gemini una explicación interactiva en React (ej: "Hazme una lección interactiva sobre el patrón Head and Shoulders en React usando Canvas").
2. **Crea la lección:** Haz clic en "Nueva Lección" en el CMS, pega el código, añade una categoría y etiquetas.
3. **Estudia:** Accede a tu catálogo organizado para repasar los conceptos cuando quieras.

## 📁 Estructura del Proyecto

- `src/app`: Rutas y páginas de la aplicación.
- `src/components`: Componentes UI reutilizables (Editor, Visor, Lista).
- `src/lib`: Lógica de base de datos y acciones del servidor.
- `prisma`: Esquema de base de datos y migraciones.
- `Dockerfile` & `docker-compose.yml`: Configuración de contenedores.

---
Creado para potenciar el aprendizaje de análisis técnico mediante IA.
