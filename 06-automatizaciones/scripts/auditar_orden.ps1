# Auditoría implacable de orden en MonetizaciónFacebook
# Uso: powershell -ExecutionPolicy Bypass -File 06-automatizaciones/scripts/auditar_orden.ps1

$raiz = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$permitidosRaiz = @("AGENTS.md", "README.md", ".agents", ".git", ".gitignore")
$errores = 0

Write-Host "=== 1. Verificando archivos sueltos en raiz ==="
Get-ChildItem -Path $raiz -Force | ForEach-Object {
    if ($permitidosRaiz -notcontains $_.Name -and $_.Name -notmatch "^(0[0-6]|99)-") {
        Write-Warning "Elemento fuera de regla en raiz: $($_.Name)"
        $errores++
    }
}

Write-Host "=== 2. Verificando convencion de nombres en carpetas documentales ==="
$carpetasConFecha = @(
    "01-estrategia-y-nichos",
    "02-investigacion",
    "03-analisis-y-estadisticas\informes",
    "03-analisis-y-estadisticas\auditorias-criticas",
    "05-bitacora-y-errores"
)
foreach ($rel in $carpetasConFecha) {
    $ruta = Join-Path $raiz $rel
    if (-not (Test-Path $ruta)) { continue }
    Get-ChildItem -Path $ruta -Recurse -File | ForEach-Object {
        if ($_.Name -notmatch "^\d{4}-\d{2}-\d{2}_[a-z0-9-]+\.[a-z0-9]+$") {
            Write-Warning "Nombre sin convencion (YYYY-MM-DD_kebab-case.ext): $($_.FullName)"
            $errores++
        }
    }
}

if ($errores -eq 0) {
    Write-Host "`n[OK] Orden implacable verificado: 0 infracciones." -ForegroundColor Green
} else {
    Write-Host "`n[ALERTA] Se detectaron $errores infracciones de orden." -ForegroundColor Yellow
}
