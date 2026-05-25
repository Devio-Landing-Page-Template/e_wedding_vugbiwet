# 💍 Natchaya & Pongpan — Wedding Invitation Website

**ยินดีต้อนรับสู่โปรเจกต์เว็บไซต์คำเชิญแต่งงานแบบหรูหรา**

นี่คือเว็บไซต์อัมพรเลิศเต็มไปด้วยอนิเมชั่นและเอฟเฟกต์ที่สวยงาม สำหรับส่งคำเชิญแต่งงานออนไลน์พร้อมระบบรับ RSVP อัตโนมัติ

---

## 📋 สารบัญ

1. [ภาพรวมของโปรเจกต์](#-ภาพรวมของโปรเจกต์)
2. [โครงสร้างไฟล์](#-โครงสร้างไฟล์)
3. [รายละเอียดของแต่ละไฟล์](#-รายละเอียดของแต่ละไฟล์)
4. [วิธีการแก้ไข](#-วิธีการแก้ไข)
5. [การตั้งค่า RSVP](#-การตั้งค่า-rsvp)
6. [วิธีการใช้งาน](#-วิธีการใช้งาน)

---

## 📖 ภาพรวมของโปรเจกต์

โปรเจกต์นี้ประกอบด้วย:

- **🎥 เว็บไซต์หลัก (index.html)**: หน้าแต่งงานหลักที่มี 3 ส่วน
  - ส่วนที่ 1: ฮีโร่พื้นหลังวิดีโอ
  - ส่วนที่ 2: รายละเอียดเหตุการณ์
  - ส่วนที่ 3: ฟอร์ม RSVP

- **💌 การ์ดส่วนตัว (card.html)**: เวอร์ชันมินิมัลสำหรับแชร์แบบสั้น

- **🎨 ระบบสไตล์**: CSS ที่ออกแบบมาสำหรับหน้าเดสก์ทอป แท็บเล็ต และมือถือ

- **⚙️ ลอจิก JavaScript**: ทำให้เว็บไซต์โต้ตอบได้ ระบบ scroll reveal และรับข้อมูล RSVP

- **📦 สิ่งอำนวยความสะดวก**: รูปภาพ วิดีโอ และฟอนต์ที่จำเป็น

---

## 📁 โครงสร้างไฟล์

```
e_wedding_vugbiwet/
│
├── README.md                          ← ไฟล์นี้ (คู่มือการใช้งาน)
├── RSVP_Google_Sheet_Setup.md         ← คู่มือการตั้งค่า Google Sheet
│
├── index.html                         ← เว็บไซต์หลักของแต่งงาน
├── card.html                          ← เวอร์ชันการ์ดส่วนตัว
│
├── style.css                          ← กำหนดรูปแบบเว็บไซต์หลัก (index.html)
├── card-style.css                     ← กำหนดรูปแบบการ์ด (card.html)
│
├── script.js                          ← ลอจิก JavaScript เว็บหลัก
├── card-logic.js                      ← ลอจิก JavaScript สำหรับการ์ด
│
└── assets/                            ← โฟลเดอร์เก็บไฟล์ประกอบ
    ├── images/                        ← รูปภาพ (ขนาดไม่เกิน 1MB)
    ├── videos/                        ← ไฟล์วิดีโอพื้นหลัง
    └── fonts/                         ← ฟอนต์ที่กำหนดเอง (ถ้ามี)
```

---

## 🔍 รายละเอียดของแต่ละไฟล์

### 📄 **index.html** — เว็บไซต์หลักของแต่งงาน

**ใช้สำหรับ:** การแสดงคำเชิญแต่งงานแบบเต็มรูปแบบพร้อมเอฟเฟกต์และ RSVP

**โครงสร้างหลัก:**
```html
<!-- ส่วน 1: ฮีโร่ (Hero) -->
<section class="hero" id="hero">
  - วิดีโอพื้นหลัง
  - ข้อความต้อนรับ
  - ปุ่มเลื่อนลง
</section>

<!-- ส่วน 2: รายละเอียด (Details) -->
<section class="details" id="details">
  - วันที่และเวลา
  - สถานที่
  - ลำดับของงาน
</section>

<!-- ส่วน 3: RSVP -->
<section class="rsvp" id="rsvp">
  - ฟอร์มรับการตอบรับ
  - ช่องกรอกชื่อ เบอร์ โทร ที่อยู่ เป็นต้น
</section>
```

**วิธีแก้ไข:**
- เปิดไฟล์ด้วย Editor (VS Code หรือ Notepad++)
- ค้นหาข้อความที่ต้องการเปลี่ยน
- เปลี่ยนค่า ค่อยๆ บันทึก
- รีเฟรช Browser เพื่อดูผลลัพธ์

**ตัวอย่างการแก้ไข:**
```html
<!-- เปลี่ยนชื่อคู่แต่งงาน -->
<h1 class="hero__title">
  <span>Natchaya</span>  ← เปลี่ยนชื่อจากที่นี่
  <span class="hearts">&nbsp;♥&nbsp;</span>
  <span>Pongpan</span>
</h1>

<!-- เปลี่ยนวันที่แต่งงาน -->
<p class="details__date">
  October 25, 2025  ← เปลี่ยนวันที่จากที่นี่
</p>
```

---

### 💌 **card.html** — การ์ดส่วนตัวสั้น

**ใช้สำหรับ:** แชร์ผ่าน WhatsApp Line Facebook หรือช่องทางสื่อสารอื่น (ขนาดเล็ก โหลดเร็ว)

**เนื้อหาหลัก:**
- ข้อความต้อนรับสั้นๆ
- ลิงค์ไปหน้า index.html แบบสมบูรณ์
- พื้นหลังวิดีโอเดียวกัน
- แอนิเมชั่นอนุภาคบรรยากาศ

**วิธีแก้ไข:**
- คล้ายกับ index.html
- ค้นหา `.stage` class เพื่อแก้ไขส่วนการ์ด
- ค้นหา `href="index.html"` เพื่อเปลี่ยนลิงค์ (ถ้าจำเป็น)

---

### 🎨 **style.css** — กำหนดรูปแบบเว็บหลัก

**ใช้สำหรับ:** ทำให้ index.html มีรูปลักษณ์ที่สวยงาม

**ส่วนหลัก:**

```css
/* 1. ตัวแปรสีและฟอนต์ */
:root {
  --primary-color: #d4af37;    /* สีทอง */
  --text-color: #2c2c2c;        /* สีข้อความ */
  --bg-color: #f8f7f2;          /* สีพื้นหลัง */
}

/* 2. ฮีโร่พื้นหลัง */
.hero {
  height: 100vh;                /* ความสูงเต็มหน้าจอ */
  background: linear-gradient(...);
}

/* 3. รายละเอียด */
.details {
  padding: 60px 20px;
  text-align: center;
}

/* 4. RSVP Form */
.rsvp {
  max-width: 600px;
}
```

**วิธีแก้ไข:**
- **เปลี่ยนสี**: ค้นหา `#d4af37` (สีทอง) และเปลี่ยนเป็นสีที่ต้องการ
- **เปลี่ยนฟอนต์**: ค้นหา `font-family` และแก้ไข
- **เปลี่ยนช่องว่าง (padding/margin)**: ค้นหา `padding:` หรือ `margin:` แล้วเปลี่ยนตัวเลข
- **เปลี่ยนขนาดตัวอักษร**: ค้นหา `font-size:` แล้วเปลี่ยนตัวเลข (หน่วย px)

**ตัวอย่าง:**
```css
/* เปลี่ยนสีข้อความหลัก */
.hero__title {
  color: #d4af37;  ← เปลี่ยนสีจากที่นี่
  font-size: 48px; ← เปลี่ยนขนาดฟอนต์จากที่นี่
}
```

---

### 💌 **card-style.css** — กำหนดรูปแบบการ์ด

**ใช้สำหรับ:** ตกแต่ง card.html

**การแก้ไขเหมือนกับ style.css** แต่เฉพาะส่วนการ์ด

---

### ⚙️ **script.js** — ลอจิก JavaScript เว็บหลัก

**ใช้สำหรับ:** 
- เคลื่อนไหว scroll reveal
- ปุ่มนำทาง (Nav dots) ที่ทำงานอัตโนมัติ
- ส่งข้อมูล RSVP ไปยัง Google Sheet

**ส่วนสำคัญ:**

```javascript
/* 1. ตั้งค่า Google Sheet URL */
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
// ← เปลี่ยน URL จากเซต็อพ RSVP Google Sheet

/* 2. ปุ่มส่ง RSVP */
const submitBtn = document.getElementById('rsvp-submit');
submitBtn.addEventListener('click', async () => {
  // ส่งข้อมูลไปยัง Google Sheet
});

/* 3. Scroll Reveal Animation */
const revealObserver = new IntersectionObserver(...);
// องค์ประกอบที่มี class 'reveal-up' จะเด้งขึ้นมาเมื่อเลื่อนดู
```

**วิธีแก้ไข:**
- **เปลี่ยน URL Google Sheet**: ค้นหา `GOOGLE_SCRIPT_URL` แล้วแทนที่ URL (ดูหัวข้อ "การตั้งค่า RSVP")
- **เปลี่ยนความเร็วแอนิเมชั่น**: ค้นหา `threshold:` หรือ `duration:` แล้วเปลี่ยนตัวเลข
- **เปลี่ยนข้อความแสดงความสำเร็จ**: ค้นหา `success-message` แล้วแก้ไข

---

### 🎬 **card-logic.js** — ลอจิก JavaScript สำหรับการ์ด

**ใช้สำหรับ:** แอนิเมชั่นอนุภาคและปุ่มปิดบน card.html

**ส่วนสำคัญ:**
```javascript
/* 1. สร้างอนุภาค */
const particles = [];
// วาดหมวดหมู่ลอยนุ่นขึ้นมา

/* 2. ปุ่มปิด */
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
  window.close(); // ปิดหน้าต่าง
});
```

---

### 📦 **assets/ — โฟลเดอร์ไฟล์ประกอบ**

#### 🖼️ **images/**
**เก็บรูปภาพ** เช่น:
- `logo.png` — โลโก้เว็บไซต์
- `couple.jpg` — รูปคู่แต่งงาน
- `venue.jpg` — รูปสถานที่

**วิธีแก้ไข:**
1. ค้นหา `<img src="assets/images/...">` ใน HTML
2. เปลี่ยนชื่อไฟล์
3. อัปโหลดรูปใหม่ลงโฟลเดอร์นี้

**ตัวอย่าง:**
```html
<!-- เปลี่ยนรูปคู่แต่งงาน -->
<img src="assets/images/couple.jpg" alt="Couple Photo">
     ↓
<img src="assets/images/new-couple-photo.jpg" alt="Couple Photo">
```

#### 🎥 **videos/**
**เก็บไฟล์วิดีโอพื้นหลัง** เช่น:
- `wedding-hero.mp4` — วิดีโอหน้าเดสก์ทอป
- `wedding-hero-phone.mp4` — วิดีโอหน้ามือถือ

**วิธีแก้ไข:**
1. ค้นหา `<video>` tag ใน HTML
2. เปลี่ยนเส้นทางวิดีโอ
3. อัปโหลดวิดีโอใหม่ (ขนาดควรน้อยกว่า 5MB)

**ตัวอย่าง:**
```html
<!-- เปลี่ยนวิดีโอพื้นหลัง -->
<video autoplay muted loop>
  <source src="assets/videos/new-video.mp4" type="video/mp4">
</video>
```

#### 🔤 **fonts/**
**เก็บฟอนต์ที่กำหนดเอง** (ถ้าไม่ใช้ Google Fonts)

---

## ✏️ วิธีการแก้ไข

### 1️⃣ **แก้ไขข้อความ (ชื่อ วันที่ สถานที่)**

**ตัวอย่าง:** เปลี่ยนชื่อคู่แต่งงาน

```html
<!-- ใน index.html ค้นหาและแก้ไข: -->
<h1>Natchaya & Pongpan</h1>  ← เปลี่ยนเป็น ชื่อคู่ของคุณ
```

### 2️⃣ **เปลี่ยนสี**

**ใน style.css:**
```css
:root {
  --primary-color: #d4af37;  ← สีทอง เปลี่ยนเป็นสีที่ต้องการ
                                (ตัวอย่าง: #ff1493 = ชมพู)
}
```

### 3️⃣ **เปลี่ยนรูปภาพและวิดีโอ**

1. เตรียมรูป/วิดีโอใหม่บนคอมพิวเตอร์
2. คัดลอกลงโฟลเดอร์ `assets/images/` หรือ `assets/videos/`
3. แก้ไขชื่อไฟล์ใน HTML ให้ตรงกับชื่อไฟล์ใหม่

### 4️⃣ **เปลี่ยนข้อความรายละเอียด**

**ใน index.html ค้นหา class:**
```html
<p class="details__date">October 25, 2025</p>     ← วันที่
<p class="details__venue">Hotel Grand Plaza...</p> ← สถานที่
<p class="details__time">6:00 PM - 11:00 PM</p>   ← เวลา
```

### 5️⃣ **เปลี่ยนสถานที่/ที่อยู่**

```html
<!-- ใน index.html ค้นหา: -->
<div class="details__address">
  123 Luxury Avenue, Bangkok, Thailand
  ↓
  ← เปลี่ยนไปเป็นที่อยู่ของคุณ
</div>

<!-- ถ้ามี Google Map Embed -->
<iframe src="https://www.google.com/maps/embed?pb=..."></iframe>
  ↓
  ← เปลี่ยน URL ของแผนที่ไปยังสถานที่ของคุณ
```

---

## 📱 **การตั้งค่า RSVP**

### ✅ **ขั้นตอนสำคัญ 5 ขั้น:**

#### ขั้นตอนที่ 1: สร้าง Google Sheet
1. ไปที่ [Google Sheets](https://docs.google.com/spreadsheets/)
2. สร้าง Spreadsheet ใหม่
3. ตั้งชื่อ เช่น "Wedding RSVP Data"
4. ใน **แถวแรก (Row 1)** ให้พิมพ์หัวคอลัมน์เหล่านี้:
   ```
   timestamp | name | nickname | phone | attendance | guests | followName | notes
   ```

#### ขั้นตอนที่ 2: ตั้งค่า Google Apps Script
1. ใน Google Sheet > **Extensions (ส่วนขยาย)** > **Apps Script**
2. ลบโค้ดเดิมออก แล้ว **คัดลอกโค้ดด้านล่าง:**

```javascript
const sheetName = 'Sheet1'; // หรือชื่อ Sheet ของคุณ

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(sheetName) || doc.getSheets()[0]; 

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      return e.parameter[header] || ''; 
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. กด **Ctrl + S** เพื่อบันทึก

#### ขั้นตอนที่ 3: นำโค้ดขึ้นใช้งาน (Deploy)
1. กดปุ่ม **Deploy** (มุมขวาบน)
2. เลือก **New deployment** > **Web app**
3. ตั้งค่า:
   - **Execute as:** Me (ฉัน)
   - **Who has access:** Anyone (ทุกคน) ⭐ **สำคัญ!**
4. กด **Deploy**
5. **คัดลอก Web app URL** ที่แสดง (ตัวอย่าง: `https://script.google.com/macros/s/AKfycbx.../exec`)

#### ขั้นตอนที่ 4: ใส่ URL ลงใน script.js
1. เปิด **script.js** ในโปรเจกต์
2. ค้นหาบรรทัด:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
   ```
3. แทนที่ด้วย URL ที่คัดลอกมา:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. บันทึกไฟล์

#### ขั้นตอนที่ 5: ทดสอบ
1. เปิดเว็บไซต์ (index.html) บน Browser
2. เลื่อนไปที่ส่วน RSVP
3. กรอกข้อมูลและกดส่ง
4. ตรวจสอบ Google Sheet ว่าข้อมูลแสดงขึ้นหรือไม่

---

## 🚀 วิธีการใช้งาน

### 📂 **วิธีเปิดเว็บไซต์บนคอมพิวเตอร์:**

1. **เปิด File Explorer**
2. **ไปยังโฟลเดอร์โปรเจกต์** `e_wedding_vugbiwet`
3. **ดับเบิลคลิก `index.html`** เพื่อเปิดใน Browser

### 🌐 **วิธีอัปโหลดขึ้นเว็บสาธารณะ:**

**ใช้บริการเช่น:**
- **Netlify** (ฟรี)
- **GitHub Pages** (ฟรี)
- **Firebase Hosting** (ฟรี 1GB/เดือน)
- **Vercel** (ฟรี)
- **Web Hosting** (จ่ายตามหลัก เช่น GoDaddy, Hostinger)

**ขั้นตอน Netlify (ง่ายที่สุด):**
1. ไปที่ [Netlify.com](https://www.netlify.com)
2. ลงทะเบียนด้วยบัญชี GitHub/Google
3. ลากโฟลเดอร์ `e_wedding_vugbiwet` ลงเว็บ
4. เปิดตัวเว็บไซต์อัตโนมัติ ✨

### 📧 **วิธีแชร์:**

1. **ไปที่เว็บไซต์ที่อัปโหลด** (เช่น `https://your-wedding.netlify.app`)
2. **คัดลอก URL**
3. **แชร์ผ่าน:**
   - WhatsApp
   - Line
   - Facebook
   - Email
   - SMS

---

## 🔧 **FAQ — คำถามทั่วไป**

### ❓ "วิดีโออัปโหลดแล้ว แต่ไม่แสดง"
**วิธีแก้:**
- ตรวจสอบชื่อไฟล์ใน HTML ให้ตรงกับชื่อไฟล์ในโฟลเดอร์
- ตรวจสอบขนาด (ควรน้อยกว่า 5MB)
- รีเฟรช Browser (Ctrl+Shift+R)

### ❓ "สี theme เปลี่ยนแล้ว แต่บางส่วนไม่เปลี่ยน"
**วิธีแก้:**
- ค้นหา `--primary-color` ใน CSS ทั้งหมด
- บางที่อาจมีสีกำหนดโดยตรง (inline style) ให้แก้ไขที่นั่นด้วย

### ❓ "RSVP ส่งข้อมูลไม่ได้"
**วิธีแก้:**
1. ตรวจสอบ GOOGLE_SCRIPT_URL ถูกต้องหรือไม่
2. ตรวจสอบว่า Google Sheet มีหัวคอลัมน์ (header) ครบหรือไม่
3. เปิด Browser Console (F12) ดูข้อความ error
4. ลองใหม่หลังจาก 5 นาที (ระบบ Google อาจต้องการเวลา)

### ❓ "ต้องการเปลี่ยนฟอนต์"
**วิธีแก้:**
ใน `style.css` ค้นหา:
```css
font-family: 'Cormorant Garamond', 'Jost', 'Prompt';
```
เปลี่ยนเป็นฟอนต์ที่ต้องการ (ค้นหา Google Fonts)

### ❓ "ต้องการเปลี่ยน domain/URL"
**วิธีแก้:**
- ที่ Netlify ไปที่ Settings > Domain Management
- เพิ่ม Custom Domain และตั้งค่า DNS

---

## 📞 **ติดต่อผู้พัฒนา**

หากมีปัญหาหรือต้องการแก้ไขเพิ่มเติม ติดต่อผู้พัฒนาได้ที่:
- 📧 Email: `contact@example.com`
- 📱 Line: `@example`
- 🌐 Website: `https://example.com`

---

## ©️ **สิทธิ์**

โปรเจกต์นี้เป็นการออกแบบและพัฒนาแบบเฉพาะสำหรับแต่งงาน **Natchaya & Pongpan** 
ห้ามนำไปใช้เพื่อวัตถุประสงค์เชิงพาณิชย์โดยไม่ได้รับอนุญาต

---

**✨ ยินดีต้อนรับสู่วัน "forever begins" ของคุณ ✨**

*อัปเดตล่าสุด: 24 พฤษภาคม 2026*
