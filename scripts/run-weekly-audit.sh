#!/bin/bash
# Weekly content audit for claude-help-center-thai-deck, run by launchd.
#
# Works in its own clone under STATE_DIR so a run can never collide with
# uncommitted work in the copy you edit by hand. Logs every run; keeps 12 weeks.
#
#   Schedule : ~/Library/LaunchAgents/com.suphakorn.claude-deck-audit.plist
#   Logs     : ~/Library/Logs/claude-deck-audit/
#   Manual   : bash scripts/run-weekly-audit.sh
#   Preflight: AUDIT_DRY_RUN=1 bash scripts/run-weekly-audit.sh

set -uo pipefail

REPO_URL="https://github.com/SuphakornP/claude-help-center-thai-deck"
STATE_DIR="$HOME/.local/state/claude-deck-audit"
WORKDIR="$STATE_DIR/repo"
LOCK="$STATE_DIR/run.lock"
LOG_DIR="$HOME/Library/Logs/claude-deck-audit"
LOG="$LOG_DIR/$(date +%Y-%m-%d_%H%M%S).log"

# launchd starts with a bare PATH; gh and claude are not on it.
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

mkdir -p "$STATE_DIR" "$LOG_DIR"
exec > >(tee -a "$LOG") 2>&1

say() { printf '[%s] %s\n' "$(date '+%H:%M:%S')" "$*"; }
fail() { say "FAILED: $*"; exit 1; }

# One run at a time. A stale lock from a crashed run is cleared after 6 hours.
if [ -e "$LOCK" ]; then
  if [ -n "$(find "$LOCK" -mmin +360 2>/dev/null)" ]; then
    say "clearing stale lock"; rm -f "$LOCK"
  else
    say "another run is in progress; exiting"; exit 0
  fi
fi
touch "$LOCK"
trap 'rm -f "$LOCK"' EXIT

say "=== weekly audit: $(date '+%Y-%m-%d %H:%M:%S %Z') ==="

for bin in claude gh git; do
  command -v "$bin" >/dev/null || fail "$bin not found on PATH"
done
gh auth status >/dev/null 2>&1 || fail "gh is not authenticated (run: gh auth login)"

# The audit is worthless if the source is unreachable — check before spending a session.
code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 25 https://support.claude.com/en/ || echo 000)
[ "$code" = "200" ] || fail "support.claude.com unreachable (HTTP $code) — no changes made"
say "support.claude.com reachable"

if [ -d "$WORKDIR/.git" ]; then
  say "refreshing clone"
  git -C "$WORKDIR" fetch --quiet --prune origin || fail "fetch failed"
  git -C "$WORKDIR" checkout --quiet main || fail "checkout main failed"
  git -C "$WORKDIR" reset --hard --quiet origin/main || fail "reset failed"
  git -C "$WORKDIR" clean -qfd
else
  say "cloning"
  git clone --quiet "$REPO_URL" "$WORKDIR" || fail "clone failed"
fi
say "at $(git -C "$WORKDIR" rev-parse --short HEAD) on main"

PROMPT_FILE="$WORKDIR/scripts/weekly-audit-prompt.md"
[ -f "$PROMPT_FILE" ] || fail "prompt file missing: $PROMPT_FILE"

if [ "${AUDIT_DRY_RUN:-0}" = "1" ]; then
  say "DRY RUN: preflight passed, stopping before the Claude session"
  exit 0
fi

say "starting Claude Code (this takes 20-30 minutes)"
cd "$WORKDIR" || fail "cannot enter $WORKDIR"

# bypassPermissions is required for an unattended run: nobody is here to approve
# each edit. It is scoped to this clone, which is why the audit does not run in
# the working copy you edit by hand.
claude -p "$(cat "$PROMPT_FILE")" \
  --model claude-opus-5 \
  --permission-mode bypassPermissions \
  --add-dir "$WORKDIR"
status=$?

say "claude exited with status $status"
say "main is now at $(git -C "$WORKDIR" rev-parse --short origin/main 2>/dev/null || echo '?')"

# keep 12 weeks of logs
find "$LOG_DIR" -name '*.log' -mtime +84 -delete 2>/dev/null

say "=== done ==="
exit $status
