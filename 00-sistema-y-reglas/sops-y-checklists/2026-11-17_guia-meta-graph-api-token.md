# Guía Paso a Paso: Conectar Meta Graph API (Sin App Review)

> **Regla de oro:** Mientras tu App de Meta esté en **Modo Desarrollo (Development)** y tú seas **Administrador tanto de la App como de la Página Cultura En Corto**, puedes programar publicaciones vía API **sin pasar por App Review**.

---

## Paso 1 — Crear la App en Meta Developers (5 minutos)
1. Entra a `https://developers.facebook.com/apps/` e inicia sesión con el **mismo perfil de Facebook** que administra **Cultura En Corto**.
2. Haz clic en el botón verde **"Crear app"** (*Create App*).
3. Si te pregunta el caso de uso, elige **"Otro"** (*Other*) → Siguiente → Tipo de app: **"Negocios"** (*Business*).
4. Ponle un nombre interno (ej. `CulturaEnCorto-Publisher`), verifica tu correo y selecciona tu **Business Portfolio** (o déjalo sin portfolio si te deja crear directo). Haz clic en **Crear app**.
5. **CRÍTICO:** En la barra superior del panel de tu App, verifica que el interruptor diga **"En desarrollo" (Development)**. **NO** la cambies a "Activo/Live".
6. En el menú izquierdo ve a **Configuración de la app → Básica** (*App settings → Basic*), copia y guarda temporalmente:
   - **Identificador de la app** (`FB_APP_ID`)
   - **Clave secreta de la app** (`FB_APP_SECRET`, haz clic en *Mostrar*).

---

## Paso 2 — Sacar tu User Token temporal con los 3 permisos exactos (3 minutos)
1. Abre el **Explorador de la API Graph**: `https://developers.facebook.com/tools/explorer/`.
2. Arriba a la derecha, en el menú **"App de Meta"**, selecciona la app que acabas de crear (`CulturaEnCorto-Publisher`).
3. Debajo, en **"Usuario o página"**, deja seleccionado **"Token de usuario"** (*User Token*).
4. En **"Agregar un permiso"** (*Add a Permission*), busca y agrega estos **3 permisos**:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
5. Haz clic en el botón azul **"Generar token de acceso"** (*Generate Access Token*), acepta los permisos en la ventana emergente y **asegúrate de marcar la casilla de tu página `Cultura En Corto`**.
6. Copia el token largo que aparece en el campo **"Token de acceso"**. *(Este primer token dura ~1 hora).*

---

## Paso 3 — Guardar `.env` y convertirlo en un Token de Página PERMANENTE (2 minutos)
1. En la carpeta raíz del proyecto (`MonetizaciónFacebook/`), crea un archivo llamado `.env` (copiando la plantilla de [06-automatizaciones/scripts/.env.example](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/06-automatizaciones/scripts/.env.example)) y llena de momento solo:
   ```env
   FB_APP_ID=TU_APP_ID
   FB_APP_SECRET=TU_APP_SECRET
   FB_GRAPH_VERSION=v25.0
   ```
2. Ejecuta en PowerShell (reemplazando `PEGA_AQUI_EL_USER_TOKEN` por el token del Paso 2):
   ```powershell
   & "C:\Users\damia\AppData\Local\Programs\Python\Python312\python.exe" 06-automatizaciones/scripts/programar_meta_api.py --exchange-user-token "PEGA_AQUI_EL_USER_TOKEN"
   ```
3. El script te imprimirá un JSON con tus páginas. Busca `"name": "Cultura En Corto"`, copia su `"id"` y su `"access_token"` (ese token de página **ya no expira**) y agrégalos a tu `.env`:
   ```env
   FB_PAGE_ID=EL_ID_QUE_IMPRIMIO
   FB_PAGE_ACCESS_TOKEN=EL_ACCESS_TOKEN_DE_PAGINA
   ```

---

## Paso 4 — Programar todo el Lote Piloto con 1 solo comando
1. Prueba en seco (sin enviar nada a Facebook):
   ```powershell
   & "C:\Users\damia\AppData\Local\Programs\Python\Python312\python.exe" 06-automatizaciones/scripts/programar_meta_api.py --manifest 04-contenido/produccion/2026-11-17_cultura-en-corto_lote-piloto/lote_programacion.json --dry-run
   ```
2. Si todo sale `DRY_RUN_OK`, programa los 4 posts espaciados cada 4 horas en Meta:
   ```powershell
   & "C:\Users\damia\AppData\Local\Programs\Python\Python312\python.exe" 06-automatizaciones/scripts/programar_meta_api.py --manifest 04-contenido/produccion/2026-11-17_cultura-en-corto_lote-piloto/lote_programacion.json --interval-hours 4
   ```
3. Entra a **Meta Business Suite → Planificador** para ver tus 4 publicaciones ya programadas automáticamente.
