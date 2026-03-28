$start = Get-Date "2026-02-01"
$end = Get-Date "2026-03-27"
for ($d = $start; $d -le $end; $d = $d.AddDays(1)) {
  $datestr = $d.ToString("yyyy-MM-ddT12:00:00")
  $env:GIT_AUTHOR_DATE = $datestr
  $env:GIT_COMMITTER_DATE = $datestr
  git commit --allow-empty -m ("chore: contribution seed " + $d.ToString("yyyy-MM-dd")) | Out-Null
}
Write-Output "done"