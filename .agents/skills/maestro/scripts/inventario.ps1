# Inventario dinamico de habilidades disponibles para el proyecto MonetizaciónFacebook.
# Escanea skills del workspace, plugins globales y builtin, y devuelve nombre + descripcion.
# Uso: powershell -ExecutionPolicy Bypass -File .agents/skills/maestro/scripts/inventario.ps1 [-Filtro "texto"]
param([string]$Filtro = "")

$raiz = Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")
$origenes = @(
    @{ Origen = "workspace"; Ruta = Join-Path $raiz ".agents\skills" },
    @{ Origen = "plugin";    Ruta = Join-Path $env:USERPROFILE ".gemini\config\plugins" },
    @{ Origen = "global";    Ruta = Join-Path $env:USERPROFILE ".gemini\config\skills" },
    @{ Origen = "builtin";   Ruta = Join-Path $env:USERPROFILE ".gemini\antigravity\builtin\skills" }
)

$resultado = foreach ($o in $origenes) {
    if (-not (Test-Path $o.Ruta)) { continue }
    Get-ChildItem -Path $o.Ruta -Recurse -Filter "SKILL.md" -ErrorAction SilentlyContinue | ForEach-Object {
        $texto = Get-Content $_.FullName -Raw -Encoding UTF8
        $nombre = ""; $desc = ""
        if ($texto -match "(?s)^---\s*(.*?)\s*---") {
            $fm = $Matches[1]
            if ($fm -match "(?m)^name:\s*(.+)$") { $nombre = $Matches[1].Trim() }
            if ($fm -match "(?s)description:\s*(?:>-?|\|)?\s*(.*?)(?=\r?\n[a-zA-Z_-]+:|\z)") {
                $desc = ($Matches[1] -replace "\s+", " ").Trim().Trim('"', "'")
            }
        }
        if (-not $nombre) { $nombre = $_.Directory.Name }
        if ($nombre -eq "maestro") { return }
        [PSCustomObject]@{
            Nombre      = $nombre
            Origen      = $o.Origen
            Descripcion = if ($desc.Length -gt 260) { $desc.Substring(0, 260) + "..." } else { $desc }
            Ruta        = $_.FullName
        }
    }
}

if ($Filtro) {
    $resultado = $resultado | Where-Object { $_.Nombre -match $Filtro -or $_.Descripcion -match $Filtro }
}

$resultado | Sort-Object Origen, Nombre | ForEach-Object {
    "[{0}] {1}`n    {2}`n    {3}" -f $_.Origen, $_.Nombre, $_.Descripcion, $_.Ruta
}
"`nTotal: $(@($resultado).Count) habilidades"
