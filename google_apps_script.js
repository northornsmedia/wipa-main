/**
 * ==============================================================================
 * WIPA WAITING LIST - GOOGLE APPS SCRIPT WEBHOOK & SHEET FORMATTER
 * ==============================================================================
 * 
 * SPREADSHEET: https://docs.google.com/spreadsheets/d/174cg1j5JKWj6w4pfIC8YSe-TuaZduUU3n-uUWKGoJ1I/edit
 * 
 * QUICK FIX & FORMAT INSTRUCTIONS:
 * 1. In your Google Sheet, click: Extensions > Apps Script
 * 2. Select all and PASTE THIS ENTIRE SCRIPT.
 * 3. In the top toolbar, select function "formatAndCleanSheet" and click "Run".
 *    (This will instantly re-align, style, and clean your entire Google Sheet!)
 * 4. Click "Deploy" > "Manage deployments" > Edit icon (pencil) > Version: "New version" > "Deploy".
 * ==============================================================================
 */

// Master column headers aligned with WIPA design
var HEADERS = [
  "Status",
  "Full Name",
  "Selected Membership Plan",
  "Email Address",
  "Phone Number",
  "Company / Organization",
  "Profession",
  "Country",
  "Date Submitted",
  "Lead ID"
];

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
    lock.waitLock(30000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    var contents = e.postData.contents;
    var data = JSON.parse(contents);

    // Handle full reformat & sync action
    if (data.action === 'reformat_and_sync' && Array.isArray(data.leads)) {
      formatAndCleanWithData(sheet, data.leads);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        reformatted: true,
        count: data.leads.length
      })).setMimeType(ContentService.MimeType.JSON);
    }

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

/**
 * Run this function in Apps Script to instantly format, clean, and realign the sheet!
 */
function formatAndCleanSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  // Clean leads data currently in database
  var sampleLeads = [
    {
      id: "5f6ae57c-c74f-46ff-9de8-de744c65fbce",
      status: "Active Lead",
      title: "Ms.",
      name: "Claudette Vernot",
      email: "claudettevernot@estrategiajuridica.co",
      phone: "+57 3102438843",
      company: "ESTRATEGIA JURIDICA",
      profession: "Law Firm Partner / Leader",
      country: "Colombia (+57)",
      plan: "IP Professional Membership",
      created_at: "2026-09-03 10:38:53 UTC"
    },
    {
      id: "f5036eb0-16c4-4847-9e99-d980a93b93b0",
      status: "Active Lead",
      title: "Ms.",
      name: "Esen Tekin",
      email: "esentekin@gmx.fe",
      phone: "+90 5315631474",
      company: "-",
      profession: "Senior trademark attorney- Global IP Consultant",
      country: "Turkey (+90)",
      plan: "Pending Selection",
      created_at: "2026-09-10 14:10:49 UTC"
    },
    {
      id: "4768beb4-1708-477a-a6c2-1c4af07e5933",
      status: "Active Lead",
      title: "Mr.",
      name: "Carlos Alberto Northon",
      email: "carlos@northonsprmarketing.com",
      phone: "+44 07930921891",
      company: "Northon's Media PR & Marketing Ltd",
      profession: "Lawyer",
      country: "United Kingdom (+44)",
      plan: "Pending Selection",
      created_at: "2026-09-11 15:42:04 UTC"
    },
    {
      id: "7f12de45-2795-491e-b9c9-99f2a7310ed8",
      status: "Active Lead",
      title: "",
      name: "clarisse de la cerda",
      email: "clarisse@alumni.stanford.edu",
      phone: "+1 3156570591",
      company: "suny upstate medical university/ syracuse university",
      profession: "associate counsel/ researcher",
      country: "United States (+1)",
      plan: "Pending Selection",
      created_at: "2026-09-15 13:09:18 UTC"
    },
    {
      id: "c14a3e71-ae47-42f7-9124-a08d5673be5e",
      status: "Active Lead",
      title: "Mrs.",
      name: "Ana Catalina Monge Rodriguez",
      email: "ana.monge@mmonivation.com",
      phone: "+506 88627820",
      company: "MMonivation IP",
      profession: "Founder",
      country: "Costa Rica (+506)",
      plan: "Pending Selection",
      created_at: "2026-09-18 14:44:10 UTC"
    },
    {
      id: "8bf07bae-6d7b-4428-8f81-8549effd3a91",
      status: "Active Lead",
      title: "Mrs.",
      name: "Maria Andreina Andrade Limongi",
      email: "aandradelimongi@gmail.com",
      phone: "+593 993631397",
      company: "Andreina Andrade",
      profession: "Trademarks",
      country: "Ecuador (+593)",
      plan: "Pending Selection",
      created_at: "2026-09-18 15:21:44 UTC"
    },
    {
      id: "3c3b5df8-6808-49d5-b6e1-56e20f325205",
      status: "Active Lead",
      title: "Mrs.",
      name: "Dhruva Dakhani",
      email: "dhruva@northonsprmarketing.com",
      phone: "+91 07567197480",
      company: "Northon's Media PR & Marketing Ltd.",
      profession: "Trade Mark Attorney",
      country: "India (+91)",
      plan: "IP Professional Membership",
      created_at: "2026-09-24 09:39:23 UTC"
    }
  ];

  formatAndCleanWithData(sheet, sampleLeads);
}

/**
 * Re-creates headers, formats grid, and populates data cleanly
 */
function formatAndCleanWithData(sheet, leads) {
  // Clear everything
  sheet.clear();
  sheet.clearFormats();

  // 1. Insert Headers
  sheet.appendRow(HEADERS);

  // 2. Style Header Row
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontFamily("Inter");
  headerRange.setFontSize(10);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#4a0e4e"); // Executive WIPA Royal Purple
  headerRange.setFontColor("#ffffff");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // 3. Insert Lead Rows
  if (leads && leads.length > 0) {
    var rowsData = [];
    for (var i = 0; i < leads.length; i++) {
      var item = leads[i];
      var fullName = ((item.title ? item.title + " " : "") + (item.name || "")).trim();
      var plan = item.plan && item.plan.trim() ? item.plan : "Pending Selection";
      var status = item.status || "Active Lead";
      var rawPhone = item.phone ? String(item.phone).trim() : "";
      var safePhone = (rawPhone.charAt(0) === '+') ? "'" + rawPhone : rawPhone;

      rowsData.push([
        status,                                    // Col A: Status
        fullName,                                  // Col B: Full Name
        plan,                                      // Col C: Selected Membership Plan
        item.email || "",                          // Col D: Email Address
        safePhone,                                 // Col E: Phone Number
        item.company || "-",                       // Col F: Company / Organization
        item.profession || "-",                    // Col G: Profession
        item.country || "",                        // Col H: Country
        formatDate(item.created_at),               // Col I: Date Submitted
        item.id || ""                              // Col J: Lead ID
      ]);
    }

    var dataRange = sheet.getRange(2, 1, rowsData.length, HEADERS.length);
    dataRange.setValues(rowsData);

    // Style data rows
    dataRange.setFontFamily("Inter");
    dataRange.setFontSize(9.5);
    dataRange.setVerticalAlignment("middle");

    for (var r = 0; r < rowsData.length; r++) {
      var rowNum = r + 2;
      sheet.setRowHeight(rowNum, 30);
      
      // Zebra striping
      var bg = (r % 2 === 0) ? "#ffffff" : "#fdf4ff";
      sheet.getRange(rowNum, 1, 1, HEADERS.length).setBackground(bg);

      // Status Badge (Col A) - Soft Green Pill
      var statusCell = sheet.getRange(rowNum, 1);
      statusCell.setBackground("#ecfdf5");
      statusCell.setFontColor("#047857");
      statusCell.setFontWeight("bold");
      statusCell.setHorizontalAlignment("center");

      // Full Name (Col B) - Bold Left
      var nameCell = sheet.getRange(rowNum, 2);
      nameCell.setFontWeight("bold");
      nameCell.setFontColor("#111827");
      nameCell.setHorizontalAlignment("left");

      // Selected Plan (Col C) - Purple Text Centered
      var planCell = sheet.getRange(rowNum, 3);
      var currentPlan = rowsData[r][2];
      if (currentPlan === "Pending Selection") {
        planCell.setFontColor("#6b7280");
        planCell.setFontStyle("italic");
      } else {
        planCell.setBackground("#f3e8ff");
        planCell.setFontColor("#6b21a8");
        planCell.setFontWeight("bold");
      }
      planCell.setHorizontalAlignment("center");

      // Email (Col D) - Left
      sheet.getRange(rowNum, 4).setHorizontalAlignment("left").setFontColor("#1f2937");

      // Phone (Col E) - Center
      sheet.getRange(rowNum, 5).setHorizontalAlignment("center").setFontColor("#1f2937");

      // Company (Col F) - Left
      sheet.getRange(rowNum, 6).setHorizontalAlignment("left").setFontColor("#374151");

      // Profession (Col G) - Left
      sheet.getRange(rowNum, 7).setHorizontalAlignment("left").setFontColor("#374151");

      // Country (Col H) - Center
      sheet.getRange(rowNum, 8).setHorizontalAlignment("center").setFontColor("#1f2937");

      // Date Submitted (Col I) - Center muted
      sheet.getRange(rowNum, 9).setHorizontalAlignment("center").setFontColor("#6b7280");

      // Lead ID (Col J) - Center muted
      sheet.getRange(rowNum, 10).setHorizontalAlignment("center").setFontColor("#9ca3af").setFontSize(8);
    }

    // Light subtle gridlines
    dataRange.setBorder(true, true, true, true, true, true, "#e5e7eb", SpreadsheetApp.BorderStyle.SOLID);
  }

  // 4. Set Ideal Column Widths
  sheet.setColumnWidth(1, 110); // Status
  sheet.setColumnWidth(2, 210); // Full Name
  sheet.setColumnWidth(3, 230); // Selected Plan
  sheet.setColumnWidth(4, 270); // Email
  sheet.setColumnWidth(5, 160); // Phone
  sheet.setColumnWidth(6, 240); // Company
  sheet.setColumnWidth(7, 240); // Profession
  sheet.setColumnWidth(8, 170); // Country
  sheet.setColumnWidth(9, 170); // Date Submitted
  sheet.setColumnWidth(10, 160); // Lead ID
}

function insertOrUpdateLead(sheet, item) {
  var lastRow = sheet.getLastRow();
  var rawPhone = item.phone ? String(item.phone).trim() : "";
  var safePhone = (rawPhone.charAt(0) === '+') ? "'" + rawPhone : rawPhone;
  var fullName = ((item.title ? item.title + " " : "") + (item.name || "")).trim();
  var plan = item.plan && item.plan.trim() ? item.plan : "Pending Selection";
  var status = item.status || "Active Lead";

  var rowData = [
    status,
    fullName,
    plan,
    item.email || "",
    safePhone,
    item.company || "-",
    item.profession || "-",
    item.country || "",
    formatDate(item.created_at),
    item.id || ""
  ];

  // Check if item with this ID or Email already exists in sheet
  if (lastRow > 1) {
    var emailValues = sheet.getRange(2, 4, lastRow - 1, 1).getValues(); // Column D is Email
    var idValues = sheet.getRange(2, 10, lastRow - 1, 1).getValues();   // Column J is ID

    for (var r = 0; r < emailValues.length; r++) {
      var rowEmail = emailValues[r][0];
      var rowId = idValues[r][0];
      if ((item.id && rowId === item.id) || (item.email && rowEmail && rowEmail.toLowerCase() === item.email.toLowerCase())) {
        var targetRow = r + 2;
        sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
        applyRowStyle(sheet, targetRow, rowData);
        return;
      }
    }
  }

  // Otherwise append new row
  sheet.appendRow(rowData);
  applyRowStyle(sheet, sheet.getLastRow(), rowData);
}

function updateLeadPlan(sheet, item) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    insertOrUpdateLead(sheet, item);
    return;
  }

  var emailValues = sheet.getRange(2, 4, lastRow - 1, 1).getValues(); // Column D is Email
  var idValues = sheet.getRange(2, 10, lastRow - 1, 1).getValues();   // Column J is ID
  var matchedRow = -1;

  for (var r = 0; r < emailValues.length; r++) {
    var rowEmail = emailValues[r][0];
    var rowId = idValues[r][0];
    if ((item.id && rowId === item.id) || (item.email && rowEmail && rowEmail.toLowerCase() === item.email.toLowerCase())) {
      matchedRow = r + 2;
      break;
    }
  }

  if (matchedRow > 0) {
    // Column C is Selected Membership Plan
    var plan = item.plan || "Pending Selection";
    var planCell = sheet.getRange(matchedRow, 3);
    planCell.setValue(plan);
    planCell.setBackground("#f3e8ff");
    planCell.setFontColor("#6b21a8");
    planCell.setFontWeight("bold");
    planCell.setHorizontalAlignment("center");
  } else {
    insertOrUpdateLead(sheet, item);
  }
}

function applyRowStyle(sheet, rowNum, rowData) {
  sheet.setRowHeight(rowNum, 30);
  sheet.getRange(rowNum, 1, 1, HEADERS.length).setFontFamily("Inter").setFontSize(9.5).setVerticalAlignment("middle");
  
  // Status
  var statusCell = sheet.getRange(rowNum, 1);
  statusCell.setBackground("#ecfdf5").setFontColor("#047857").setFontWeight("bold").setHorizontalAlignment("center");

  // Name
  sheet.getRange(rowNum, 2).setFontWeight("bold").setFontColor("#111827").setHorizontalAlignment("left");

  // Plan
  var planCell = sheet.getRange(rowNum, 3);
  if (rowData[2] === "Pending Selection") {
    planCell.setFontColor("#6b7280").setFontStyle("italic").setHorizontalAlignment("center");
  } else {
    planCell.setBackground("#f3e8ff").setFontColor("#6b21a8").setFontWeight("bold").setHorizontalAlignment("center");
  }

  // Alignments
  sheet.getRange(rowNum, 4).setHorizontalAlignment("left");
  sheet.getRange(rowNum, 5).setHorizontalAlignment("center");
  sheet.getRange(rowNum, 6).setHorizontalAlignment("left");
  sheet.getRange(rowNum, 7).setHorizontalAlignment("left");
  sheet.getRange(rowNum, 8).setHorizontalAlignment("center");
  sheet.getRange(rowNum, 9).setHorizontalAlignment("center").setFontColor("#6b7280");
  sheet.getRange(rowNum, 10).setHorizontalAlignment("center").setFontColor("#9ca3af").setFontSize(8);
  
  sheet.getRange(rowNum, 1, 1, HEADERS.length).setBorder(true, true, true, true, true, true, "#e5e7eb", SpreadsheetApp.BorderStyle.SOLID);
}

function formatDate(dateStr) {
  if (!dateStr) return Utilities.formatDate(new Date(), "UTC", "yyyy-MM-dd HH:mm:ss") + " UTC";
  try {
    var d = new Date(dateStr);
    return Utilities.formatDate(d, "UTC", "yyyy-MM-dd HH:mm:ss") + " UTC";
  } catch (e) {
    return dateStr;
  }
}
