---
name: politicas-meta-guard
description: >-
  Binary compliance gatekeeper for MonetizaciónFacebook. Audits every script,
  caption, image, or transformed video against the 10-point Anti-Strike checklist
  (Atom 0.2) and Meta's Partner/Content Monetization Policies before publishing.
---

# Políticas Meta Guard (`politicas-meta-guard`)

> **Mandato:** Ninguna pieza sale a publicación ni pasa a empaquetado final sin aprobar **10/10** el checklist binario de [2026-11-17_checklist-pre-publicacion-anti-strike.md](file:///c:/Users/damia/Documentos/Antigravity/Monetizaci%C3%B3nFacebook/00-sistema-y-reglas/sops-y-checklists/2026-11-17_checklist-pre-publicacion-anti-strike.md).

---

## 1. Cuándo Activarse

- Antes de producir o renderizar cualquier guion/video en `viral-content-factory`.
- Antes de aprobar cualquier pieza con material de terceros (clips de *lives*, TikToks, podcasts, noticias).
- Ante cualquier alerta en *Support Home* o caída súbita de distribución en Meta.

---

## 2. Regla de Evaluación Binaria (`PASA / RECHAZADA`)

Evalúa la pieza contra los **10 puntos obligatorios**:
1. **Cero marcas de agua de terceros** (TikTok, IG, YouTube, CapCut, páginas ajenas).
2. **Transformación sustancial** (guion propio + narrativa crítica/periodística; cero reuploads o edición cosmética).
3. **Presencia / voz humana real** (cero voz TTS genérica sobre clips pasivos o reacciones mudas).
4. **Ruptura de huella visual** (citas breves fragmentadas + capas gráficas propias / B-roll / PiP).
5. **Audio 100% seguro** (*Meta Sound Collection*, propio o *Licensed Music Library* en orgánicos ≥60s).
6. **Cero *Engagement Bait*** (sin pedir likes, votos por reacción, palabras clave ni etiquetas).
7. **CTA seguro** (pregunta abierta genuina que pase la "Prueba del Amigo").
8. **Caption limpio** (sin enlaces externos en el cuerpo principal, sin abuso de MAYÚSCULAS, ≤5 hashtags).
9. **Cumplimiento CMP y Normas Comunitarias** (cero violencia gráfica, odio, acoso, desinformación o tragedias sin contexto).
10. **Salud de cuenta en verde** (verificada en *Support Home / Monetization*).

Si **1 o más puntos** fallan (`NO`), devuelve **RECHAZADA** indicando exactamente qué corregir antes de continuar.
