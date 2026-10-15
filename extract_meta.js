import fs from 'fs';
const content = fs.readFileSync('C:/Users/admin/.gemini/antigravity-ide/brain/16a85601-9454-448e-a1bf-8051bc14e1e1/.system_generated/steps/188/content.md', 'utf8');
const startTag = '<script id="__NEXT_DATA__" type="application/json">';
const s = content.indexOf(startTag);
if (s !== -1) {
  const jsonStr = content.substring(s + startTag.length, content.lastIndexOf('</script>'));
  const data = JSON.parse(jsonStr);
  const tData = data.props.pageProps.templateData;
  console.log('Template Name:', tData.templateName);
  console.log('Audio:', tData.audioTitle, tData.audioKey);
  console.log('Thumbnail:', tData.thumbnail);
  console.log('Long Thumbnail:', tData.longThumbnail);
  fs.writeFileSync('d:/demo_thiepcuoi_1/template39_meta.json', JSON.stringify(tData, null, 2));
} else {
  console.log('Not found');
}
