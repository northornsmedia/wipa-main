/**
 * ==============================================================================
 * WIPA WAITING LIST - GOOGLE APPS SCRIPT WEBHOOK
 * ==============================================================================
 * 
 * SETUP INSTRUCTIONS (Takes ~1 minute):
 * 
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/174cg1j5JKWj6w4pfIC8YSe-TuaZduUU3n-uUWKGoJ1I/edit
 * 
 * 2. In the top menu, click:
 *    Extensions > Apps Script
 * 
 * 3. Delete any default code in the editor, and PASTE THIS ENTIRE SCRIPT.
 * 
 * 4. Click the "Save" icon (or press Ctrl+S).
 * 
 * 5. Click the blue "Deploy" button at top right > "New deployment".
 * 
 * 6. Under "Select type" (gear icon), select "Web app".
 * 
 * 7. Set configuration:
 *    - Description: WIPA Waiting List Sync
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"   <--- CRITICAL! Must be "Anyone" so the website can post leads
 * 
 * 8. Click "Deploy".
 *    (If prompted, click "Authorize access", choose your Google account, click "Advanced", then "Go to (unsafe)", and click "Allow").
 * 
 * 9. Copy the "Web app URL" (it will look like: https://script.google.com/macros/s/AKfycb.../exec).
 * 
 * 10. Add that URL to your .env.local:
 *     GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
 * 
 * 11. Run: node sync_waiting_list_to_sheets.js
 *     This will immediately populate all 15 existing leads from the database!
 * ==============================================================================
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "active", 
    service: "WIPA Waiting List Webhook",
    timestamp: new Date().toISOString() 
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for any competing request
    lock.waitLock(30000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Check if headers need initialization
    ensureHeaders(sheet);

    var contents = e.postData.contents;
    var data = JSON.parse(contents);
    var rows = Array.isArray(data) ? data : [data];
    var processedCount = 0;

    for (var i = 0; i < rows.length; i++) {
      var item = rows[i];
      if (item.action === 'update_plan') {
        updateLeadPlan(sheet, item);
      } else {
        insertOrUpdateLead(sheet, item);
      }
      processedCount++;
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      processed: processedCount
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "ID",
      "Date Submitted",
      "Title",
      "Full Name",
      "Email",
      "Phone",
      "Country",
      "Company",
      "Profession",
      "Plan",
      "Business Reg No",
      "Date of Incorporation",
      "College / Institute",
      "Student ID",
      "Seats",
      "IP Address"
    ];
    
    sheet.appendRow(headers);

    // Style the header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#ec4899"); // WIPA Pink
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);

    // Format column widths nicely
    sheet.setColumnWidth(1, 140); // ID
    sheet.setColumnWidth(2, 160); // Date
    sheet.setColumnWidth(3, 70);  // Title
    sheet.setColumnWidth(4, 180); // Name
    sheet.setColumnWidth(5, 240); // Email
    sheet.setColumnWidth(6, 160); // Phone
    sheet.setColumnWidth(7, 180); // Country
    sheet.setColumnWidth(8, 220); // Company
    sheet.setColumnWidth(9, 180); // Profession
    sheet.setColumnWidth(10, 160); // Plan
    sheet.setColumnWidth(11, 150); // Business Reg No
    sheet.setColumnWidth(12, 150); // Date of Incorp
    sheet.setColumnWidth(13, 180); // College
    sheet.setColumnWidth(14, 130); // Student ID
    sheet.setColumnWidth(15, 80);  // Seats
    sheet.setColumnWidth(16, 140); // IP Address
  }
}

function insertOrUpdateLead(sheet, item) {
  var lastRow = sheet.getLastRow();
  var rawPhone = item.phone ? String(item.phone).trim() : "";
  var safePhone = (rawPhone.charAt(0) === '+') ? "'" + rawPhone : rawPhone;

  var rowData = [
    item.id || "",
    formatDate(item.created_at),
    item.title || "",
    item.name || "",
    item.email || "",
    safePhone,
    item.country || "",
    item.company || "",
    item.profession || "",
    item.plan || "",
    item.business_registration_number || "",
    item.date_of_incorporation || "",
    item.college_institute || "",
    item.student_id || "",
    item.seats || "",
    item.ip_address || ""
  ];

  // Check if item with this ID already exists
  if (item.id && lastRow > 1) {
    var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var r = 0; r < idValues.length; r++) {
      if (idValues[r][0] === item.id) {
        // Update existing row
        sheet.getRange(r + 2, 1, 1, rowData.length).setValues([rowData]);
        return;
      }
    }
  }

  // Otherwise append new row
  sheet.appendRow(rowData);
}

function updateLeadPlan(sheet, item) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    insertOrUpdateLead(sheet, item);
    return;
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 10).getValues(); // Column 1 is ID, Column 5 is Email, Column 10 is Plan
  var matchedRow = -1;

  for (var r = 0; r < values.length; r++) {
    var rowId = values[r][0];
    var rowEmail = values[r][4];
    if ((item.id && rowId === item.id) || (item.email && rowEmail && rowEmail.toLowerCase() === item.email.toLowerCase())) {
      matchedRow = r + 2;
      break;
    }
  }

  if (matchedRow > 0) {
    // Update Plan in column 10
    sheet.getRange(matchedRow, 10).setValue(item.plan || "");
    // Also update any other optional fields if present
    if (item.business_registration_number) sheet.getRange(matchedRow, 11).setValue(item.business_registration_number);
    if (item.date_of_incorporation) sheet.getRange(matchedRow, 12).setValue(item.date_of_incorporation);
    if (item.college_institute) sheet.getRange(matchedRow, 13).setValue(item.college_institute);
    if (item.student_id) sheet.getRange(matchedRow, 14).setValue(item.student_id);
    if (item.seats) sheet.getRange(matchedRow, 15).setValue(item.seats);
  } else {
    insertOrUpdateLead(sheet, item);
  }
}

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().replace('T', ' ').substring(0, 19);
  try {
    var d = new Date(dateStr);
    return Utilities.formatDate(d, "UTC", "yyyy-MM-dd HH:mm:ss") + " UTC";
  } catch (e) {
    return dateStr;
  }
}
