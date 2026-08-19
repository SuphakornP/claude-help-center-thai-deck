# Changelog

บันทึกการเปลี่ยนแปลงเนื้อหาของ deck ทั้งหมด เรียงจากใหม่ไปเก่า

Deck นี้สรุปเนื้อหาจาก [Claude Help Center](https://support.claude.com/en/) ซึ่งมีการอัปเดตต่อเนื่อง
จึงมี routine ตรวจสอบอัตโนมัติทุกวันจันทร์ 09:00 น. (Asia/Bangkok) เทียบเนื้อหาในสไลด์กับบทความต้นทาง
แล้วเปิด pull request เมื่อพบว่าต้นทางเปลี่ยนไป — ทุกการเปลี่ยนแปลงผ่านการ review ก่อน merge เสมอ

รูปแบบของแต่ละรอบ: `เปลี่ยน` (ข้อเท็จจริงที่ต่างจากเดิม) · `เพิ่ม` (เนื้อหาใหม่จากต้นทาง) ·
`ลบ` (สิ่งที่ต้นทางถอดออก) · `แก้` (ลิงก์เสีย คำผิด หรือข้อผิดพลาดอื่น)

---

## 2026-08-19 — แก้ข้อเท็จจริงที่ต้นทางเปลี่ยน + ผูก SPEAKER-NOTES เข้ากับรอบตรวจ

**เปลี่ยน**

- **สไลด์ 19** — scheduled tasks ใช้ได้ครบทุกแผนที่เสียเงินแล้ว ตัดข้อความ "ทยอยเปิดให้ใช้เริ่มจากแผน Max" ออก
  ("Scheduled tasks are available in Cowork for all paid plans (Pro, Max, Team, Enterprise)"
  — [Schedule recurring tasks in Claude Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork))
- **SPEAKER-NOTES.md** — แก้ตาราง "ข้อเท็จจริงที่ห้ามพูดผิด" ให้ตรงกับข้างบน และระบุว่า Cowork บนเว็บกับมือถือ
  อยู่ในสถานะ beta ตามที่ต้นทางเขียนไว้

**เพิ่ม**

- บันทึกใน [CLAUDE.md](CLAUDE.md) ว่า `SPEAKER-NOTES.md` เขียนข้อเท็จจริงซ้ำจากสไลด์ 5 ข้อ
  ถ้าแก้ข้อไหนในสไลด์ต้องแก้ที่บทพูดด้วยใน commit เดียวกัน ไม่งั้นคนจะพูดตัวเลขเก่าบนเวที
- routine รายสัปดาห์ถูกสั่งให้ตรวจและอัปเดต `SPEAKER-NOTES.md` ควบคู่กับสไลด์ด้วยแล้ว


## 2026-08-14 — ขยายตัวอักษรสำหรับฉายจอใหญ่

**เพิ่ม**

- **ปุ่มขยายตัวอักษร** มุมขวาบน (A− / A+) ปรับได้ 90% – 200% พร้อมคีย์ลัด `+` `−` และ `0` เพื่อรีเซ็ต
  แก้ปัญหาตอนต่อโปรเจกเตอร์แล้วตัวอักษรเล็กเกินไปสำหรับคนหลังห้อง
- ระดับที่เลือกถูกจำไว้ใน `localStorage` และมีตัวเลขบอกขนาดขึ้นกลางจอสั้น ๆ ตอนกดปรับ
- **เพดานอัตโนมัติตามความกว้างจอ** — บนมือถือขยายได้ราว 115% เพราะเกินกว่านั้นคอลัมน์จะแคบเกินอ่าน
  ปุ่ม A+ จะถูกปิดเมื่อถึงเพดาน และค่าที่จำไว้จะถูกลดลงให้พอดีจอเมื่อเปิดบนเครื่องที่เล็กกว่า

**เปลี่ยน**

- เลย์เอาต์ภายในสไลด์ย้ายจาก media query มาใช้ **container query** เพราะการขยายตัวอักษรทำให้คอลัมน์แคบลง
  โดยที่ viewport ไม่เปลี่ยน — กริดจึงยุบจาก 4 → 2 → 1 คอลัมน์ตามความกว้างจริงที่เหลือ
- ตารางบีบตัวลงแทนการเลื่อนซ้ายขวาเมื่อคอลัมน์อยู่ในช่วงที่เกิดจากการขยาย (บนมือถือยังเลื่อนเหมือนเดิม)
- ตัวเลขประจำบทใช้หน่วย `cqw` เพื่อย่อตามคอลัมน์
- สั่ง Print จะกลับไปใช้ขนาด 100% เสมอ

---

## 2026-08-13 — ตรวจสอบความถูกต้องกับต้นทาง (รอบที่ 1)

ไล่อ่านบทความต้นทางครบทั้ง 81 URL ที่ deck อ้างอิง พร้อม collection index ทั้ง 7 หัวข้อ
ทุก URL ตอบกลับ HTTP 200 ไม่มี URL ใดถูก redirect ไปบทความอื่น และไม่มีบทความใดหายไปจาก collection

**เปลี่ยน**

- **สไลด์ 27** — กำกับว่า Claude Code on the web อยู่ในสถานะ **research preview** ตามตารางสถานะทางการ
  ([Available beta and research preview features](https://support.claude.com/en/articles/14503520-available-beta-and-research-preview-features) ระบุ “Claude Code web (CCR) — Research preview”)
- **สไลด์ 38** — กำกับว่า **voice mode ทั้งฟีเจอร์**อยู่ในสถานะ beta ไม่ใช่แค่การรองรับภาษาอื่นนอกจากอังกฤษ
  (“Voice mode is a beta feature available to all plans…” — [Use voice mode](https://support.claude.com/en/articles/11101966-use-voice-mode))
- **สไลด์ 45** — 1Password integration อยู่ในสถานะ **beta** ใช้ได้เฉพาะ **Claude Desktop บน macOS** และต้องมี Claude in Chrome
  ([Get started with 1Password for Claude](https://support.claude.com/en/articles/15936181-get-started-with-1password-for-claude))
- **สไลด์ 28** — สิทธิ์ที่ Claude GitHub App ขอคือ contents, **issues** และ pull requests (เดิมระบุแค่ contents กับ pull requests)
  ([Set up Code Review](https://support.claude.com/en/articles/14233555-set-up-code-review-for-claude-code))

**เพิ่ม**

- **สไลด์ 27** — เพิ่มลิงก์อ้างอิงไปยังหน้า Available beta and research preview features รวมลิงก์อ้างอิงเป็น 90

**ไม่เปลี่ยน (ตรวจแล้วของเดิมถูก)**

- **สไลด์ 46** — รอบตรวจอัตโนมัติเสนอให้แก้ “สามอย่างที่ต้องขออนุมัติเสมอ” เป็นสี่อย่าง โดยนับ “Managing site permissions” เป็นรายการที่ 4
  ตรวจโครงสร้าง HTML ของต้นทางแล้วพบว่า `<ul>` มีเพียง 3 `<li>` ส่วน “Managing site permissions” เป็น `<h3>` ของหัวข้อถัดไป — **ของเดิมถูกต้อง จึงไม่แก้**
  ([Claude in Chrome permissions guide](https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide))

**อ้างอิง ณ วันที่** 13 สิงหาคม 2026

## 2026-08-13 — เผยแพร่ครั้งแรก

**เพิ่ม**

- Deck ภาษาไทย 50 สไลด์ ครอบคลุม 7 collection ทางการ — Claude, Claude Cowork, Claude Code,
  Claude Desktop, Claude Mobile apps, Connectors, Claude in Chrome
- Reference footer ทุกสไลด์ ลิงก์กลับบทความต้นทางบน support.claude.com
  (89 ลิงก์ จาก 81 URL ที่ไม่ซ้ำกัน ตรวจแล้วตอบกลับ HTTP 200 ทั้งหมด)
- ระบบนำทาง: keyboard, swipe, สารบัญ overlay, deep link รายสไลด์, light/dark theme, print เป็น PDF
- SVG diagram 3 ชุดที่ปรับตามธีม — ecosystem, Cowork cloud vs local, remote vs local MCP
- รองรับจอกว้าง 375px ขึ้นไป และเผยแพร่ผ่าน GitHub Pages

**อ้างอิง ณ วันที่** 13 สิงหาคม 2026
