# 🚂 Guía de Despliegue en Railway (Monorepo)

¡El proyecto ya está **100% listo** para subirse a Railway! Gracias a la nueva estructura Monorepo en la carpeta `/apps` y los `Dockerfile` optimizados para producción, el proceso es muy directo.

Sigue este paso a paso para tener tu aplicación en vivo:

## Paso 1: Subir el código a GitHub
Asegúrate de que todo tu código (incluyendo la nueva carpeta `/apps`) esté subido a un repositorio en tu cuenta de GitHub. Asegúrate de eliminar las carpetas viejas `frontend` y `backend` de la raíz si aún existen, para que GitHub solo tenga la carpeta `apps`.

## Paso 2: Crear el Proyecto y la Base de Datos en Railway
1. Entra a [Railway.app](https://railway.app/) y haz clic en **New Project**.
2. Selecciona **Deploy from GitHub repo** y elige tu repositorio.
3. Railway escaneará el repositorio, pero no crees los servicios todavía. Primero, haz clic en **+ New** > **Database** > **Add PostgreSQL**.
4. Espera a que la base de datos se inicialice.

## Paso 3: Desplegar el Backend
Dado que es un Monorepo, debemos decirle a Railway dónde está el backend.

1. Haz clic en **+ New** > **GitHub Repo** > Selecciona tu repositorio de nuevo. (Esto creará un servicio para el backend).
2. Haz clic en el nuevo bloque del servicio que se creó, ve a la pestaña **Settings**.
3. Baja hasta la sección **Build**:
   * En **Root Directory**, escribe: `/apps/backend`
   * Railway detectará automáticamente el `Dockerfile` que optimizamos e iniciará el build.
4. Ve a la pestaña **Variables** del Backend y agrega:
   * `JWT_SECRET`: (escribe una contraseña súper segura).
   * `NODE_ENV`: `production`
   * Haz clic en **New Variable** > **Add Reference** y selecciona `DATABASE_URL` de tu base de datos PostgreSQL recién creada.
5. (Opcional): Agrega `SENTRY_DSN` si configuraste Sentry.
6. En la pestaña **Settings**, baja hasta **Networking** y haz clic en **Generate Domain** para obtener la URL pública de tu API (ej: `turnos-backend-production.up.railway.app`). ¡Copia esta URL!

## Paso 4: Desplegar el Frontend
Ahora desplegaremos el cliente React.

1. Haz clic en **+ New** > **GitHub Repo** > Selecciona tu repositorio una vez más. (Este será el frontend).
2. Haz clic en este nuevo servicio, ve a la pestaña **Settings**.
3. Baja hasta la sección **Build**:
   * En **Root Directory**, escribe: `/apps/frontend`
   * Railway detectará el `Dockerfile` de Nginx.
4. Ve a la pestaña **Variables** del Frontend y agrega el entorno para compilar:
   * `VITE_API_URL`: Pega aquí el dominio que generaste en el backend en el Paso 3 (Ej: `https://turnos-backend-production.up.railway.app/api`).
5. Vuelve a la pestaña **Settings** > **Networking** y haz clic en **Generate Domain**. Esta será la URL pública final de tu página web.

## Paso 5: Ajuste final de CORS (Importante)
Para que el Backend acepte las peticiones exclusivas de tu nuevo dominio Frontend:

1. Ve a las **Variables** de tu servicio Backend.
2. Edita o agrega la variable de entorno que controla el CORS. Según nuestro archivo `app.ts`, si pasamos `VITE_API_URL` al backend, o definimos el dominio. En el código actual, `app.ts` lee `process.env.VITE_API_URL` para permitir el origen.
3. Agrega la variable `VITE_API_URL` en el **Backend** y ponle el dominio que Railway le asignó a tu **Frontend** (Ej: `https://turnos-frontend-production.up.railway.app`).

---
🎉 **¡Listo!** En unos minutos, Railway terminará de compilar el Multi-Stage Dockerfile de ambas aplicaciones, inyectará las variables, la base de datos se sincronizará sola (porque incluimos `npx prisma db push` en el Dockerfile del back), y tu app estará 100% online y segura.
