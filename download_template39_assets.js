import https from 'https';
import fs from 'fs';
import path from 'path';

const dir = 'd:/demo_thiepcuoi_1/public/images/template39';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const assets = [
  { url: 'https://img.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/156f95f0-f1f2-41b5-9feb-c47d96ff65d0.jpeg', name: 'hero_main.jpeg' },
  { url: 'https://assets.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/7dc164ec-37de-419b-9e33-a92eafd44fdc.jpeg', name: 'bride.jpeg' },
  { url: 'https://assets.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/bc6fcb69-9450-4329-8201-75081809241d.jpeg', name: 'groom.jpeg' },
  { url: 'https://assets.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/ee967957-18a5-41b2-bbdb-7f13c7c82321.png', name: 'notebook_paper.png' },
  { url: 'https://assets.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/36845bd2-c26e-4176-9ad8-e955bcd7e738.jpeg', name: 'middle_banner.jpeg' },
  { url: 'https://assets.cinelove.me/templates/assets/a2f11727-8717-46db-ada4-ff29271ce53b/0b6a64d0-658b-4bb9-916b-9fa6a26c68bc.jpeg', name: 'bottom_countdown.jpeg' },
  { url: 'https://assets.cinelove.me/resources/weddingElements/wyw30q16qr77surq1fhqc.png', name: 'icon_welcome.png' },
  { url: 'https://assets.cinelove.me/resources/weddingElements/p9r9hqnxqhoep7qg3x6ytf.png', name: 'icon_ceremony.png' },
  { url: 'https://assets.cinelove.me/resources/weddingElements/w4x2kkenv6f8ij6j6n44g3.png', name: 'icon_dinner.png' },
  { url: 'https://assets.cinelove.me/resources/flowchartIcons/bc7ro23uqhun7ge954163l.png', name: 'gift_box_icon.png' },
  { url: 'https://assets.cinelove.me/assets/plugins/calen_heart_1.png', name: 'calen_heart.png' }
];

async function download(item) {
  return new Promise((resolve) => {
    const filePath = path.join(dir, item.name);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, res => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log('Downloaded: ' + item.name);
          resolve(true);
        });
      } else {
        console.error('Failed ' + item.name + ' with status ' + res.statusCode);
        resolve(false);
      }
    }).on('error', err => {
      console.error('Error ' + item.name + ': ' + err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const a of assets) {
    await download(a);
  }
}
run();
