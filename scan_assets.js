import fs from 'fs';
const content = fs.readFileSync('C:/Users/admin/.gemini/antigravity-ide/brain/16a85601-9454-448e-a1bf-8051bc14e1e1/.system_generated/steps/188/content.md', 'utf8');

const regexUrls = /https:\/\/[^"'()\s]+/g;
const urls = new Set(content.match(regexUrls) || []);
console.log('--- ALL URLS ---');
for (const u of urls) {
  if (u.includes('cinelove.me') && (u.includes('.jpg') || u.includes('.jpeg') || u.includes('.png') || u.includes('.webp') || u.includes('.mp3'))) {
    console.log(u);
  }
}

// Find all texts inside contentEditable="false" or headings
const textMatches = content.match(/contentEditable="false">([^<]+)<\/div>/g) || [];
console.log('--- ALL TEXTS ---');
for (const t of textMatches) {
  console.log(t.replace(/contentEditable="false">/, '').replace(/<\/div>/, ''));
}
