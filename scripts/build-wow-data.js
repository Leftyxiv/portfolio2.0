import 'dotenv/config';
import { BlizzardAPI } from '../src/lib/blizzard-api.ts';
import fs from 'fs/promises';
import path from 'path';

const characters = {
  'magicmushies': { realm: 'area-52', name: 'magicmushies' },
  'wtbarm': { realm: 'malganis', name: 'wtbarm' },
  'leftylocs': { realm: 'turalyon', name: 'leftylocs' }
};

async function buildWoWData() {
  console.log('Building static WoW character data...');
  
  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;
  const region = process.env.BLIZZARD_REGION || 'us';

  if (!clientId || !clientSecret) {
    console.error('Missing Blizzard API credentials');
    return;
  }

  const characterData = {};

  for (const [key, char] of Object.entries(characters)) {
    try {
      console.log(`Fetching ${key}...`);
      const api = new BlizzardAPI({
        clientId,
        clientSecret,
        region,
        realm: char.realm,
        characterName: char.name
      });

      const data = await api.getCharacterData();
      characterData[key] = data;
      console.log(`✓ Fetched ${key}`);
    } catch (error) {
      console.error(`Failed to fetch ${key}:`, error);
      characterData[key] = null;
    }
  }

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'api', 'wow-characters-static.json');
  await fs.writeFile(outputPath, JSON.stringify({
    data: characterData,
    error: null,
    timestamp: new Date().toISOString()
  }, null, 2));

  console.log('✨ Static WoW data generated successfully!');
}

buildWoWData().catch(console.error);