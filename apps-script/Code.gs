/**
 * MATA HATI PWA V3
 * CMS backend: Google Sheets + Google Drive + Apps Script
 *
 * Run setupProject() once.
 * Deploy one Web App as "Anyone" for the PUBLIC API.
 * Deploy another Web App as "Only myself" for the ADMIN.
 */
const APP = {
  name: 'MATA HATI',
  sheetProp: 'MATA_HATI_SHEET_ID',
  folderProp: 'MATA_HATI_DRIVE_FOLDER_ID',
  tz: Session.getScriptTimeZone() || 'Asia/Makassar'
};
const HEADERS = ['ID','Tanggal','Judul','Kategori','Ringkasan','Isi','MediaURL','MediaType','VideoURL','Status','Penulis','Dibuat','Diubah'];

function setupProject() {
  const props = PropertiesService.getScriptProperties();
  let ss, sheetId = props.getProperty(APP.sheetProp);
  if (sheetId) { try { ss = SpreadsheetApp.openById(sheetId); } catch(e) {} }
  if (!ss) { ss = SpreadsheetApp.create('MATA HATI — Database Konten'); props.setProperty(APP.sheetProp, ss.getId()); }
  let sh = ss.getSheetByName('KONTEN');
  if (!sh) sh = ss.insertSheet('KONTEN');
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  sh.setFrozenRows(1);
  let folderId = props.getProperty(APP.folderProp), folder;
  if (folderId) { try { folder = DriveApp.getFolderById(folderId); } catch(e) {} }
  if (!folder) { folder = DriveApp.createFolder('MATA HATI — MEDIA'); props.setProperty(APP.folderProp, folder.getId()); }
  return {ok:true, sheetId:ss.getId(), sheetUrl:ss.getUrl(), folderId:folder.getId(), folderUrl:folder.getUrl()};
}

function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  if (p.action === 'public') return publicApi_(p);
  return HtmlService.createHtmlOutputFromFile('Admin').setTitle('MATA HATI — Admin CMS').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function publicApi_(p) {
  const payload = JSON.stringify({ok:true, items:listPublished_()});
  if (p.callback) return ContentService.createTextOutput(p.callback+'('+payload+')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}

function getConfig() {
  const p = PropertiesService.getScriptProperties();
  return {sheetId:p.getProperty(APP.sheetProp)||'', folderId:p.getProperty(APP.folderProp)||'', timezone:APP.tz};
}
function listAll() { return readRows_(); }
function listPublished_() { return readRows_().filter(x=>String(x.Status).toUpperCase()==='PUBLIK'); }

function readRows_() {
  const id = PropertiesService.getScriptProperties().getProperty(APP.sheetProp);
  if (!id) return [];
  const sh = SpreadsheetApp.openById(id).getSheetByName('KONTEN');
  if (!sh || sh.getLastRow()<2) return [];
  const values = sh.getDataRange().getValues();
  return values.slice(1).map(r=>{ const o={}; HEADERS.forEach((h,i)=>o[h]=r[i] instanceof Date?Utilities.formatDate(r[i],APP.tz,'yyyy-MM-dd HH:mm:ss'):r[i]); return o; }).filter(x=>x.ID);
}

function saveContent(item) {
  const lock=LockService.getScriptLock(); lock.waitLock(10000);
  try {
    ensureSetup_();
    const sh=SpreadsheetApp.openById(getConfig().sheetId).getSheetByName('KONTEN');
    const now=new Date(), id=item.ID||('MH-'+Utilities.getUuid().slice(0,8).toUpperCase()), existing=findRow_(sh,id);
    let mediaUrl=item.MediaURL||'', mediaType=item.MediaType||'';
    if (item.file && item.file.base64) { const u=saveMedia_(item.file); mediaUrl=u.url; mediaType=u.type; }
    const row=[id,item.Tanggal||Utilities.formatDate(now,APP.tz,'yyyy-MM-dd'),clean_(item.Judul),clean_(item.Kategori||'Inspirasi'),clean_(item.Ringkasan),item.Isi||'',mediaUrl,mediaType,item.VideoURL||'',item.Status||'DRAFT',clean_(item.Penulis||'MATA HATI'),existing?sh.getRange(existing,12).getValue():now,now];
    if(existing) sh.getRange(existing,1,1,HEADERS.length).setValues([row]); else sh.appendRow(row);
    return {ok:true,id:id,message:'Konten tersimpan.'};
  } finally { lock.releaseLock(); }
}
function deleteContent(id) {
  ensureSetup_(); const sh=SpreadsheetApp.openById(getConfig().sheetId).getSheetByName('KONTEN'), row=findRow_(sh,id);
  if(!row) return {ok:false,message:'Konten tidak ditemukan.'}; sh.deleteRow(row); return {ok:true,message:'Konten dihapus.'};
}
function ensureSetup_(){if(!getConfig().sheetId) setupProject();}
function findRow_(sh,id){const n=Math.max(sh.getLastRow()-1,1), ids=sh.getRange(2,1,n,1).getValues().flat(), idx=ids.findIndex(x=>String(x)===String(id)); return idx<0?null:idx+2;}
function saveMedia_(file){
  const folder=DriveApp.getFolderById(getConfig().folderId), bytes=Utilities.base64Decode(file.base64);
  const blob=Utilities.newBlob(bytes,file.mimeType||'application/octet-stream',file.name||'media'), f=folder.createFile(blob);
  f.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);
  return {url:'https://drive.google.com/uc?export=view&id='+f.getId(),type:file.mimeType||''};
}
function clean_(s){return String(s==null?'':s).trim();}
