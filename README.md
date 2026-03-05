# Sistema de Gestión de Turnos

Sistema completo para la gestión de turnos ("appointment booking system") con roles de Administrador, Profesional y Cliente, incluyendo recordatorios automáticos por WhatsApp usando Twilio.

## Arquitectura

El proyecto está dividido en:
- `/backend`: API RESTful en Node.js, Express, TypeScript, PostgreSQL (Prisma ORM). Maneja la lógica de negocio, autenticación (JWT) y cron jobs para enviar recordatorios 24 horas antes a los clientes.
- `/frontend`: SPA en React (Vite) con React Router, Axios y Context API para la gestión de estado de autenticación.

## Requisitos

- `Docker` y `Docker Compose` instalados en tu máquina.
- (Opcional) Una cuenta y sandbox de Twilio activos para enviar mensajes de WhatsApp.

## Instalación y Ejecución

1. Clona este repositorio y navega a la carpeta principal:
   ```bash
   cd turnos
   ```

2. Copia el archivo `.env.example` a `.env` en la raíz del proyecto para definir tus variables sensibles (como Twilio o el JWT Secret):
   ```bash
   cp .env.example .env
   ```

3. Levanta los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

   _Nota: Este comando construirá tanto la imagen del backend como la del frontend, y levantará el contenedor de Postgres. El backend esperará automáticamente a que la base de datos esté lista para aplicar las migraciones y arrancar._

4. **Acceso a la app**:
   - Frontend: [http://localhost](http://localhost) (Se sirve vía Nginx localmente mapeado al puerto 80)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## Características principales

- **Roles**: 
  - `admin`: Administra todo el sistema.
  - `profesional`: Ve sus turnos asignados.
  - `cliente`: Puede ver sus turnos y crear nuevos turnos con profesionales.
- **Recordatorios**: Un proceso secundario revisa cada 10 minutos y envía un mensaje de WhatsApp vía Twilio para aquellos turnos que estén a 24 horas de ocurrir.
- **Docker**: Entorno 100% contenerizado listo para producción.

## Credenciales de Prueba

Al levantar la base de datos, se carga información inicial por defecto. Puedes usar estas credenciales:

**Administrador:**
- Email: `admin@turnos.com`
- Password: `admin123`

**Profesionales:**
- Email: `juan.perez@turnos.com` o `maria.gomez@turnos.com`
- Password: `profesional123`

**Cliente:**
- Puedes acceder usando registrar cuenta en el frontend.

## 🔒 Seguridad (Mejoras VIP)

Para garantizar la viabilidad del proyecto en un entorno real, este sistema incluye mecanismos de seguridad:

1. **Autenticación Fuerte:** `bcrypt` para las contraseñas y `jsonwebtoken` para acceso.
2. **Validadores Estrictos:** Se utiliza `Zod` como Middleware para sanear y garantizar que el cuerpo de las peticiones (login/registro/etc) sea 100% válido.
3. **CORS Dinámico y Helmet:** Las cabeceras HTTP están ofuscadas contra ataques comunes y el CORS está restringido a dominios reales según la variable `NODE_ENV`.
4. **Rate Limit Global y Específico:** Bloqueo de IP contra DDoS y Fuerza Bruta (ej. máximo 5 intentos erróneos de login por 15 min).

### 🚀 Habilitar HTTPS en Producción

El backend Node.js en sí corre sobre HTTP localmente (Puerto 3000 de Docker).
La **estrategia recomendada** para exponer este proyecto con `HTTPS (SSL)` es utilizar un *Reverse Proxy* frente a los contenedores:

*   **Cloudflare (Más fácil):** Configura tus DNS hacia tus servidores y habilita la encriptación "Flexible" o "Full" en su panel.
*   **Nginx + Let's Encrypt:** Instala `certbot` en la máquina anfitriona y crea un Server Block en Nginx (puerto 443) que intercepte el tráfico seguro y lo envíe hacia `http://127.0.0.1:3000`.
*   **PaaS (Railway/Render/Heroku):** Si despliegas usando un PaaS, estos servicios incluyen un endpoint HTTPS autoconfigurado. Simplemente inyecta las variables del archivo `.env.production` provistas.

## 📊 Monitoreo y Logs (Fase 7)

Para evitar perder la pista de los errores que afecten al cliente:
*   **Pino Logger:** Implementado como gestor principal de Logs. En desarrollo (`NODE_ENV=development`) verás salidas de colores bonitas por consola. En producción, la aplicación botará logs en formato JSON RAW de altísima velocidad, ideado para ser leído por plataformas de monitoreo como *Datadog* o *Kibana*.
*   **Sentry:** Se incluyó soporte nativo para `Sentry`. Para habilitar la captura de Crash Reports y Telemetría Automática, únicamente precisas añadir la variable `SENTRY_DSN=tu_url_aqui` dentro del `.env` correspondiente y el servidor Express se enganchará enseguida mandando analíticas.

## 🐳 Dockerizar TODO (Monorepo - Fase 8)

El proyecto fue reestructurado en un formato `Monorepo` (con la carpeta nativa `/apps`) para mayor profesionalismo, manejabilidad y despliegues estandarizados.

Existen 2 ecosistemas que puedes arrancar desde la raíz del proyecto usando `docker-compose`:

### 1) Entorno de Desarrollo Local
Arranca la app sirviendo tu código fuente asociado dinámicamente (`Hot Reload` activo) exponiendo la conexión a Base de Datos en el puerto 5432 para que puedas depurar la data visualmente usando DBBeaver o PgAdmin:
```bash
docker-compose -f docker/docker-compose.dev.yml up -d --build
```

### 2) Entorno de Producción
Genera imágenes aisladas Multi-Stage que descartan el código fuente para aligerar la carga, y desconecta la visibilidad de la Base de datos aislandola en una red interna inviolable llamada `turnos_prod_net`:
```bash
docker-compose -f docker/docker-compose.prod.yml up -d --build
```
