# คู่มือการตั้งค่า Google Sheet สำหรับรับข้อมูล RSVP

เพื่อให้ฟอร์ม RSVP บนหน้าเว็บส่งข้อมูลมาเก็บที่ Google Sheet ได้อัตโนมัติ กรุณาทำตามขั้นตอนดังต่อไปนี้ครับ:

## 1. สร้าง Google Sheet
1. ไปที่ [Google Sheets](https://docs.google.com/spreadsheets/) และสร้าง Spreadsheet ใหม่
2. ตั้งชื่อไฟล์ตามต้องการ เช่น "Wedding RSVP Data"
3. ใน **แถวที่ 1 (Row 1)** ของ Sheet ให้พิมพ์หัวคอลัมน์ (Headers) **ให้ตรงกับตัวพิมพ์เล็ก-ใหญ่ตามนี้เป๊ะๆ** (เรียงลำดับอย่างไรก็ได้):
   - `timestamp` (สำหรับเก็บวันที่และเวลา)
   - `name` (ชื่อ-นามสกุล)
   - `nickname` (ชื่อเล่น)
   - `phone` (เบอร์โทรศัพท์)
   - `attendance` (การเข้าร่วม: attending / declines)
   - `guests` (จำนวนคน)
   - `followName` (ชื่อผู้ติดตาม)
   - `notes` (ข้อจำกัดด้านอาหาร)

## 2. เขียนโค้ด Google Apps Script
1. ในหน้า Google Sheet ที่สร้างไว้ ไปที่เมนู **ส่วนขยาย (Extensions)** > **Apps Script**
2. ลบโค้ดที่มีอยู่เดิมออกให้หมด แล้ว **คัดลอกโค้ดด้านล่างนี้ไปวางแทน**:

```javascript
const sheetName = 'แผ่นที่ 1'; // หรือ 'Sheet1' ขึ้นอยู่กับชื่อ Sheet ด้านล่างซ้ายของคุณ

function doPost (e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    // ค้นหา Sheet จากชื่อที่ตั้งไว้ หรือเอา Sheet แรกสุดถ้าหาไม่เจอ
    const sheet = doc.getSheetByName(sheetName) || doc.getSheets()[0]; 

    // ดึง Header จากแถวแรกสุด
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // นำข้อมูลที่ได้รับมาใส่ให้ตรงกับ Header
    const newRow = headers.map(function(header) {
      return e.parameter[header] || ''; 
    });

    // บันทึกข้อมูลลง Sheet
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

3. กดปุ่ม **บันทึก (Save)** (ไอคอนรูปแผ่นดิสก์) หรือกด `Ctrl + S` / `Cmd + S`

## 3. นำโค้ดขึ้นใช้งาน (Deploy)
1. มุมขวาบนของหน้า Apps Script กดปุ่ม **การทำให้ใช้งานได้ (Deploy)** > **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
2. คลิกที่รูป **เฟือง (⚙️)** ข้างๆ คำว่า Select type (เลือกประเภท) และเลือก **เว็บแอป (Web app)**
3. ตั้งค่าตามนี้:
   - **คำอธิบาย:** (เว้นว่างไว้ หรือพิมพ์อะไรก็ได้ เช่น RSVP v1)
   - **เรียกใช้ในฐานะ (Execute as):** เลือก **ฉัน (Me)** 
   - **ผู้มีสิทธิ์เข้าถึง (Who has access):** เลือก **ทุกคน (Anyone)** *(สำคัญมาก มิฉะนั้นเว็บจะส่งข้อมูลมาไม่ได้)*
4. กดปุ่ม **การทำให้ใช้งานได้ (Deploy)**
5. *หากมีการขอสิทธิ์ใช้งาน (Authorize access):* 
   - กด Authorize access 
   - เลือกบัญชี Google ของคุณ 
   - หากขึ้นเตือนความปลอดภัยว่า Google hasn't verified this app ให้กด **Advanced (ขั้นสูง)** แล้วเลือก **Go to ... (unsafe) / ไปที่ ... (ไม่ปลอดภัย)**
   - เลื่อนลงมากด **Allow (อนุญาต)**
6. เมื่อ Deploy สำเร็จ จะมีหน้าต่างแสดง **URL ของเว็บแอป (Web app URL)** ให้กดปุ่ม **คัดลอก (Copy)** URL นั้นไว้

## 4. นำ URL มาใส่ในโค้ดเว็บไซต์
1. เปิดไฟล์ `script.js` ในโปรเจกต์ของคุณ
2. เลื่อนไปหาบรรทัดที่มีข้อความนี้ (ประมาณบรรทัดที่ 234):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
   ```
3. นำ URL ที่คัดลอกมาจากขั้นตอนที่ 3 มาวางแทนคำว่า `YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE` 
   *(ตัวอย่าง: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfy.../exec';`)*
4. บันทึกไฟล์ `script.js` และลองกรอกข้อมูลบนหน้าเว็บเพื่อทดสอบได้เลย! ข้อมูลจะเข้าไปปรากฏที่ Google Sheet ทันทีพร้อมแสดงวันที่และเวลาปัจจุบัน
