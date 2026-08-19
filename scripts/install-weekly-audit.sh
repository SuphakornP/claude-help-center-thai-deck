#!/bin/bash
# Install (or reinstall) the weekly audit schedule on this Mac.
#   bash scripts/install-weekly-audit.sh
# Remove it with:
#   launchctl bootout gui/$(id -u)/com.suphakorn.claude-deck-audit
#   rm ~/Library/LaunchAgents/com.suphakorn.claude-deck-audit.plist
set -euo pipefail

LABEL="com.suphakorn.claude-deck-audit"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNNER="$HERE/run-weekly-audit.sh"
TARGET="$HOME/Library/LaunchAgents/$LABEL.plist"

[ -f "$RUNNER" ] || { echo "runner not found: $RUNNER" >&2; exit 1; }
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs/claude-deck-audit"

sed -e "s|PLACEHOLDER_SCRIPT_PATH|$RUNNER|g" \
    -e "s|PLACEHOLDER_HOME|$HOME|g" \
    "$HERE/$LABEL.plist" > "$TARGET"
plutil -lint "$TARGET" >/dev/null

launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$TARGET"

echo "installed: $TARGET"
echo "runs     : every Monday 09:00 (catches up at next wake if the Mac was asleep)"
echo "logs     : ~/Library/Logs/claude-deck-audit/"
echo
echo "run once now to test:  launchctl kickstart -p gui/$(id -u)/$LABEL"
