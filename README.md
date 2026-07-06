# AutomaticDev

Sitio web de AutomaticDev: landing pública (ES/EN) con portfolio dinámico + panel de administración privado para cargar proyectos.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript + React 19
- **Tailwind CSS v4** para el diseño (tema en `app/globals.css`)
- **Prisma** + **PostgreSQL** (pensado para [Neon](https://neon.tech))
- **next-intl** para el selector de idioma ES/EN
- **Vercel Blob** para las imágenes de los proyectos
- **Resend** para el email del formulario de contacto
- Sesión de admin propia (JWT firmado con `jose`, cookie httpOnly) — no hay usuarios múltiples, solo vos

## Estructura

```
app/[locale]/        Sitio público (home con todas las secciones)
app/admin/            Panel admin (login, dashboard, alta/edición de proyectos)
app/sitemap.ts        Sitemap
app/robots.ts         Robots.txt (bloquea /admin)
components/sections/  Hero, Servicios, Beneficios, Portfolio, Proceso, Contacto, Footer, Navbar
components/admin/     Login, formulario de proyecto, botón de borrado
components/ui/        Button, GlowCard, Reveal (animaciones), SectionHeading
lib/                  prisma, auth, session, site (whatsapp/instagram), actions/ (server actions)
i18n/                 Configuración de next-intl (routing, request, navigation)
messages/es.json      Textos en español
messages/en.json      Textos en inglés
prisma/schema.prisma  Modelos Project y Message
proxy.ts              Middleware: protege /admin y maneja el idioma
scripts/build-assets.mjs  Genera favicon/ícono/OG a partir del logo original
```

## Cómo se actualiza el portfolio

Los proyectos que cargás en `/admin/dashboard` se guardan en Postgres y la home los lee directo en cada visita (la página está marcada como dinámica), así que se reflejan al instante sin necesidad de rebuildear ni cachear nada.

---

## Deploy paso a paso (Vercel + Neon)

### 1. Subir el código a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
```

Creá un repo en GitHub y pusheá.

### 2. Crear el proyecto en Vercel

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión (podés usar tu cuenta de GitHub).
2. **Add New → Project** e importá el repositorio.
3. Framework Preset: Vercel detecta Next.js automáticamente. No hace falta tocar nada más acá.
4. Todavía no hagas deploy — primero configurá las variables de entorno (paso 5).

### 3. Crear la base de datos en Neon

1. En el dashboard de Vercel: **Storage → Create Database → Neon (Postgres)**. Esto crea la base y conecta las variables automáticamente al proyecto — no hay que copiar ni renombrar nada.
   - Alternativa: crear la base directo en [neon.tech](https://neon.tech) y copiar las connection strings a mano.
2. La integración crea, entre otras, dos variables que usa el proyecto directamente:
   - `DATABASE_URL` → connection string *pooled* (para las queries normales de la app)
   - `DATABASE_URL_UNPOOLED` → connection string *directa* (para correr las migraciones)

   El resto de las variables que agrega Neon (`PGHOST`, `POSTGRES_*`, etc.) no se usan y se pueden ignorar.

### 4. Crear el Blob Store (imágenes)

1. En Vercel: **Storage → Create Database → Blob**.
2. Esto genera automáticamente la variable `BLOB_READ_WRITE_TOKEN` en tu proyecto.

### 5. Variables de entorno en Vercel

En **Project Settings → Environment Variables**, cargá (además de las de Neon/Blob que ya se agregaron solas):

| Variable | Valor |
|---|---|
| `SESSION_SECRET` | Generarla con `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ADMIN_EMAIL` | `automaticcdev@gmail.com` (o el mail con el que querés loguearte) |
| `ADMIN_PASSWORD_HASH` | Ver instrucciones abajo |
| `RESEND_API_KEY` | Tu API key de [resend.com](https://resend.com) (plan gratuito alcanza) |
| `CONTACT_TO_EMAIL` | `automaticcdev@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://automaticdev.cloud` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `542236015295` |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` | `automaticcdev` |

**Generar el hash de tu contraseña de admin** (nunca se guarda la contraseña en texto plano):

```bash
node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" "TU-CONTRASEÑA-AQUI"
```

Copiá el resultado (empieza con `$2b$12$...`) en `ADMIN_PASSWORD_HASH`.

> ⚠️ Si alguna vez ponés este hash en un archivo `.env` local (no en el dashboard de Vercel), escapá los signos `$` como `\$`, porque si no Next.js los interpreta como variables y corrompe el hash. En el dashboard de Vercel esto no es un problema.

### 6. Deploy

Con las variables cargadas, hacé click en **Deploy** en Vercel (o pusheá a `main` si ya estaba conectado). Vercel corre automáticamente `prisma generate && next build`.

Después del primer deploy, corré las migraciones contra la base de Neon (una sola vez, y cada vez que cambies `prisma/schema.prisma`):

```bash
# En tu máquina, con las variables de Neon en tu .env
npx prisma migrate deploy
```

O más simple para arrancar: `npx prisma db push` (crea las tablas directamente sin generar carpeta de migraciones).

### 7. Conectar el dominio

1. En Vercel: **Project Settings → Domains → Add** → `automaticdev.cloud`.
2. Vercel te va a mostrar los registros DNS (A/CNAME) que tenés que cargar donde compraste el dominio.
3. Esperá la propagación (puede tardar hasta un par de horas) y listo.

### 8. Verificar el sender de Resend (opcional pero recomendado)

Por defecto los emails se mandan desde `onboarding@resend.dev`, que funciona sin configurar nada. Si más adelante querés que salgan desde tu propio dominio (ej. `contacto@automaticdev.cloud`), verificá el dominio en Resend y cambiá el `from` en `lib/actions/contact.ts`.

---

## Desarrollo local

```bash
npm install
cp .env.example .env   # completar con tus propios valores
npx prisma db push      # crea las tablas en tu base
npm run dev
```

Otros comandos útiles:

```bash
npm run build      # build de producción
npm run typecheck   # chequeo de tipos
npm run lint        # ESLint
```

Para regenerar los assets del logo (favicon, ícono, imagen OG) a partir de `referencias/Logo/logo.jpg`:

```bash
node scripts/build-assets.mjs
```
