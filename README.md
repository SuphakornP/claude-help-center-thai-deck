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

- ตารางที่กว้างเกินหน้าจอ **เลื่อนในแนวนอนได้ในตัวเอง** (มีข้อความบอกใต้ตารางเมื่อจำเป็น)
- สไลด์ที่เนื้อหายาวเกินหน้าจอบนมือถือ **เลื่อนขึ้นลงในสไลด์นั้นได้**
- ทุกสไลด์มี URL ของตัวเอง เช่น `index.html#s17` — คัดลอกลิงก์ไปแชร์เฉพาะสไลด์ได้
- ธีมที่เลือกถูกจำไว้ใน `localStorage` และตั้งค่าเริ่มต้นตามธีมของระบบ
- สั่ง Print / Save as PDF ได้ โดยแต่ละสไลด์จะแยกเป็นหนึ่งหน้า

## การอ้างอิง

ทุกสไลด์ทั้ง 50 สไลด์มี footer "อ้างอิง" ที่ลิงก์กลับไปยังบทความต้นทางบน support.claude.com
รวม **89 ลิงก์** จาก **81 URL ที่ไม่ซ้ำกัน** — ตรวจสอบแล้วว่าตอบกลับ HTTP 200 ทุกลิงก์ (13 ส.ค. 2026)

## ข้อจำกัดและข้อควรทราบ

- เอกสารนี้เป็นการ **สรุปและแปล** ไม่ใช่เอกสารทางการของ Anthropic — กรณีเนื้อหาขัดแย้งกัน ให้ยึดตาม support.claude.com
- ข้อมูลถูกเก็บ ณ **13 สิงหาคม 2026** ราคา ความพร้อมใช้งานตามแผน และฟีเจอร์สถานะ beta / research preview เปลี่ยนแปลงได้ตลอด
- ฟีเจอร์ที่ระบุว่าอยู่ในสถานะ research preview ในเอกสารต้นทาง เช่น **computer use ใน Cowork** และ **Code Review** ถูกกำกับสถานะไว้ในสไลด์แล้ว

## ไฟล์ในโปรเจกต์

```
index.html          โครงสไลด์ทั้ง 50 สไลด์ (เนื้อหาเป็น static HTML)
assets/style.css    design system, layout, responsive, theme, print
assets/deck.js      ตัวควบคุม deck — navigation, สารบัญ, ธีม, deep link
```

ไม่มี dependency ภายนอก ไม่มี build step ไม่โหลด font หรือ script จาก CDN
