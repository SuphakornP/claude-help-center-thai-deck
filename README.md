# Claude Official Support — Web Slide Deck (ภาษาไทย)

Slide deck แบบเว็บ สรุปการใช้งาน Claude จากเอกสาร [Claude Help Center](https://support.claude.com/en/) อย่างเป็นทางการ
เนื้อหาเป็นภาษาไทย โดยคง technical term เป็นภาษาอังกฤษตามเดิม

**เปิดอ่านได้ที่ → [suphakornp.github.io/claude-help-center-thai-deck](https://suphakornp.github.io/claude-help-center-thai-deck/)**

## เปิดใช้งาน

เปิดผ่านลิงก์ด้านบนได้เลย หรือเปิดไฟล์ `index.html` ด้วย browser ตรง ๆ (double-click) — ไม่ต้องติดตั้งอะไร
ไม่ต้องต่ออินเทอร์เน็ต ยกเว้นตอนกดลิงก์อ้างอิงที่จะเปิดไปยัง support.claude.com

หากต้องการเปิดผ่าน local server:

```bash
python3 -m http.server 8000
```

## โครงสร้างเนื้อหา — 50 สไลด์ / 7 หัวข้อ

| บท | หัวข้อ | สไลด์ |
|---|---|---|
| — | เปิดเรื่อง · สารบัญ · ภาพรวม ecosystem | 1–3 |
| 01 | **Claude** — พื้นฐาน, interfaces, แผน, Projects, Skills, Artifacts, Search/Thinking/Research, Memory, usage limits | 4–12 |
| 02 | **Claude Cowork** — พื้นฐาน, availability, capabilities, architecture, permission modes, scheduled tasks, computer use, projects, ความปลอดภัย | 13–22 |
| 03 | **Claude Code** — พื้นฐาน, แผน/seats, model configuration, Claude Code on the web, security review + Code Review, analytics, FAQ | 23–30 |
| 04 | **Claude Desktop** — ติดตั้ง/ข้อกำหนด OS, Quick Entry, desktop extensions + local MCP | 31–34 |
| 05 | **Claude Mobile apps** — iOS, Android, voice mode &amp; dictation | 35–38 |
| 06 | **Connectors** — พื้นฐาน MCP, desktop vs web, custom connectors, tool access | 39–43 |
| 07 | **Claude in Chrome** — ติดตั้ง, permissions, ความปลอดภัย, troubleshooting | 44–48 |
| — | สรุป: เลือก surface ให้ถูกงาน · แหล่งอ้างอิงทั้งหมด | 49–50 |

## การใช้งาน

| การกระทำ | Desktop | Mobile |
|---|---|---|
| เลื่อนสไลด์ | `←` `→` `Space` `PageUp/Down` หรือปุ่มลูกศรที่ dock | ปัดซ้าย/ขวา |
| ไปสไลด์แรก / สุดท้าย | `Home` / `End` | ผ่านสารบัญ |
| เปิดสารบัญ | `M` หรือคลิกเลขสไลด์ที่ dock | แตะเลขสไลด์ที่ dock |
| ปิดสารบัญ | `Esc` หรือ `M` | แตะพื้นที่ว่าง |
| สลับ light / dark | `T` หรือปุ่มมุมขวาบน | ปุ่มมุมขวาบน |
| ขยาย / ย่อตัวอักษร | `+` / `−` · `0` เพื่อกลับ 100% | ปุ่ม A เล็ก–ใหญ่ มุมขวาบน |

- ตารางที่กว้างเกินหน้าจอ **เลื่อนในแนวนอนได้ในตัวเอง** (มีข้อความบอกใต้ตารางเมื่อจำเป็น)
- สไลด์ที่เนื้อหายาวเกินหน้าจอบนมือถือ **เลื่อนขึ้นลงในสไลด์นั้นได้**
- ทุกสไลด์มี URL ของตัวเอง เช่น `index.html#s17` — คัดลอกลิงก์ไปแชร์เฉพาะสไลด์ได้
- ธีมที่เลือกถูกจำไว้ใน `localStorage` และตั้งค่าเริ่มต้นตามธีมของระบบ
- สั่ง Print / Save as PDF ได้ โดยแต่ละสไลด์จะแยกเป็นหนึ่งหน้า

### ขยายตัวอักษรตอนฉายจอใหญ่

ปุ่ม **A− / A+** มุมขวาบน (หรือปุ่ม `+` `−` บนคีย์บอร์ด) ขยายเนื้อหาได้ **90% – 200%**
สำหรับตอนต่อโปรเจกเตอร์แล้วคนหลังห้องอ่านไม่ออก กด `0` เพื่อกลับไป 100%

- ขยายแล้ว **เนื้อหาจัดเรียงใหม่จริง** ไม่ใช่แค่ซูมภาพ — การ์ดจาก 4 คอลัมน์ยุบเหลือ 2 แล้วเหลือ 1
  ตารางบีบตัวลงแทนที่จะต้องเลื่อนซ้ายขวา และสไลด์ที่ยาวขึ้นก็เลื่อนขึ้นลงได้ตามปกติ
- ระดับที่เลือกไว้ **ถูกจำไว้** ข้ามการเปิดใหม่ (`localStorage`)
- บนจอเล็ก ระบบจะ**จำกัดเพดานให้อัตโนมัติ** ตามความกว้างที่เหลือ — บนมือถือจึงขยายได้ถึงราว 115%
  เพราะเกินกว่านั้นคอลัมน์จะแคบจนอ่านไม่ได้ ปุ่ม A+ จะจางลงเมื่อถึงเพดาน
- ตอนสั่ง Print / Save as PDF ระบบจะกลับไปใช้ 100% เสมอ

## การอ้างอิง

ทุกสไลด์ทั้ง 50 สไลด์มี footer "อ้างอิง" ที่ลิงก์กลับไปยังบทความต้นทางบน support.claude.com
รวม **90 ลิงก์** จาก **81 URL ที่ไม่ซ้ำกัน** — ตรวจสอบแล้วว่าตอบกลับ HTTP 200 ทุกลิงก์ (13 ส.ค. 2026)

## ซ้อมพูด / นำไปเทรน

[SPEAKER-NOTES.md](SPEAKER-NOTES.md) — บทซ้อมพูดสำหรับ session **15–20 นาที** พร้อมตารางคุมเวลา
บทพูดรายช่วง เช็คลิสต์ก่อนขึ้นเวที รายการที่ตัดได้เมื่อเวลาไม่พอ และข้อเท็จจริงที่ห้ามพูดผิด
ธีมคือ *"เอา Claude ไปทำงานให้เสร็จยังไง"* ไม่ใช่ *"Claude ใช้ยังไง"*

## การอัปเดตอัตโนมัติ

เอกสารต้นทางบน support.claude.com เปลี่ยนแปลงต่อเนื่อง จึงมี scheduled agent ทำงาน
**ทุกวันจันทร์ 09:00 น.** บนเครื่อง Mac ของผู้ดูแล (ตั้งผ่าน `launchd`) เพื่อ:

1. ไล่อ่านบทความต้นทางทั้ง 81 URL ที่ deck อ้างอิงไว้ **โดยใช้ support.claude.com เป็นแหล่งเดียวเท่านั้น**
2. เทียบข้อเท็จจริงในสไลด์กับบทความล่าสุด (ราคา แผน เวอร์ชัน OS สถานะ beta / research preview ฯลฯ)
3. ถ้าพบว่าต่าง — แตก branch `content-refresh/YYYY-MM-DD` แก้สไลด์ แล้วแก้ไฟล์ที่เขียนข้อเท็จจริงเดียวกันซ้ำไว้
   ให้ตรงกันใน commit เดียว: [CHANGELOG.md](CHANGELOG.md), README และ [SPEAKER-NOTES.md](SPEAKER-NOTES.md)
   จากนั้นเปิด pull request กลับ `main`
4. ถ้าไม่พบความเปลี่ยนแปลง — จบรอบโดยไม่เปิด PR ไม่ทิ้ง branch ค้าง

**การ merge เป็นอัตโนมัติ แต่มีเงื่อนไข** — PR จะถูก squash merge เองก็ต่อเมื่อผ่าน verification suite ครบทั้ง 4 ข้อ:
HTML tag ครบคู่ · ทุกสไลด์ยังมี reference footer · จำนวนสไลด์ตรงกับ counter และ README · ทุก URL ที่อ้างอิงยังตอบกลับ 200
ถ้าตกข้อใดข้อหนึ่ง PR จะถูกปล่อยค้างไว้พร้อมคอมเมนต์บอกสาเหตุ เพื่อให้คนเข้ามาตรวจ

ทุกการเปลี่ยนแปลงยังผ่าน PR เสมอเพื่อเก็บ audit trail ไม่มีการ push เข้า `main` โดยตรง — และเนื่องจาก `main`
deploy ขึ้น GitHub Pages ทันที การแก้ที่ไม่มีหลักฐานจากต้นทางยืนยันจึงถูกสั่งห้ามไม่ให้ใส่เข้า PR ตั้งแต่แรก

**ถ้ารันไม่สำเร็จ** มันจะไม่เงียบหาย — เขียน log ไว้ทุกครั้งที่ `~/Library/Logs/claude-deck-audit/`
และถ้า push ไม่ได้จะทิ้ง branch ไว้ในเครื่องพร้อมรายงานว่าไม่มีอะไรถูกเผยแพร่

### ติดตั้งบนเครื่องใหม่

```bash
bash scripts/install-weekly-audit.sh
```

| | |
|---|---|
| ตารางเวลา | จันทร์ 09:00 — ถ้าเครื่องหลับอยู่ `launchd` จะรันให้ตอนเปิดเครื่องครั้งถัดไป ไม่ข้ามรอบ |
| ทำงานที่ | clone แยกใน `~/.local/state/claude-deck-audit/repo` ไม่ยุ่งกับสำเนาที่คุณแก้อยู่ |
| Log | `~/Library/Logs/claude-deck-audit/` เก็บ 12 สัปดาห์ |
| ทดสอบ preflight | `AUDIT_DRY_RUN=1 bash scripts/run-weekly-audit.sh` |
| สั่งรันเต็มทันที | `launchctl kickstart -p gui/$(id -u)/com.suphakorn.claude-deck-audit` |
| ถอนออก | `launchctl bootout gui/$(id -u)/com.suphakorn.claude-deck-audit` |

รันแบบไม่มีคนเฝ้า จึงใช้ `--permission-mode bypassPermissions` ซึ่งข้ามการถามอนุมัติทุกครั้ง —
เป็นเหตุผลที่มันทำงานใน clone แยกต่างหาก ไม่ใช่ในโฟลเดอร์ที่คุณแก้ไฟล์อยู่

## ข้อจำกัดและข้อควรทราบ

- เอกสารนี้เป็นการ **สรุปและแปล** ไม่ใช่เอกสารทางการของ Anthropic — กรณีเนื้อหาขัดแย้งกัน ให้ยึดตาม support.claude.com
- ข้อมูลถูกเก็บ ณ **13 สิงหาคม 2026** ราคา ความพร้อมใช้งานตามแผน และฟีเจอร์สถานะ beta / research preview เปลี่ยนแปลงได้ตลอด
- ฟีเจอร์ที่ระบุว่าอยู่ในสถานะ beta หรือ research preview ในเอกสารต้นทาง เช่น **computer use ใน Cowork**, **Code Review**, **Claude Code on the web**, **voice mode** และ **1Password for Claude** ถูกกำกับสถานะไว้ในสไลด์แล้ว

## ไฟล์ในโปรเจกต์

```
index.html          โครงสไลด์ทั้ง 50 สไลด์ (เนื้อหาเป็น static HTML)
assets/style.css    design system, layout, responsive, theme, print
assets/deck.js      ตัวควบคุม deck — navigation, สารบัญ, ธีม, text zoom, deep link
SPEAKER-NOTES.md    บทซ้อมพูด 15–20 นาที
CHANGELOG.md        บันทึกการแก้เนื้อหาทุกรอบ
CLAUDE.md           คู่มือสำหรับ Claude Code ที่เข้ามาแก้ repo นี้
```

ไม่มี dependency ภายนอก ไม่มี build step ไม่โหลด font หรือ script จาก CDN
