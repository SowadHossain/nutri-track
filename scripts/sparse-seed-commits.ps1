param(
  [string]$startDate = "2026-02-01",
  [string]$endDate = "2026-03-27",
  [double]$includeProbability = 0.65
)

$start = Get-Date $startDate
$end = Get-Date $endDate

Write-Output "Creating orphan branch 'sparse-seed'..."
git checkout --orphan sparse-seed

# Clear index but keep working tree files
git reset --mixed
git rm -r --cached . 2>$null

# Create random seed commits
for ($d = $start; $d -le $end; $d = $d.AddDays(1)) {
  if ((Get-Random) -lt ($includeProbability * [int]::MaxValue)) {
    $datestr = $d.ToString("yyyy-MM-ddT12:00:00")
    $env:GIT_AUTHOR_DATE = $datestr
    $env:GIT_COMMITTER_DATE = $datestr
    git commit --allow-empty -m "chore: contribution seed $($d.ToString('yyyy-MM-dd'))" | Out-Null
  }
}

# Commit current working tree as the real changes with Mar 28 date
$realDate = "2026-03-28T12:00:00"
$env:GIT_AUTHOR_DATE = $realDate
$env:GIT_COMMITTER_DATE = $realDate

git add -A
if (git diff --staged --quiet) {
  Write-Output "No staged changes to commit for the final snapshot."
} else {
  git commit -m "chore: remove Dyad mentions, cleanup, and add mock data"
}

# Replace master with sparse branch
if (git show-ref --verify --quiet refs/heads/master) {
  git branch -D master
}

git branch -m master

Write-Output "Sparse history created and branch renamed to 'master'."