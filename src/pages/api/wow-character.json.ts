import type { APIRoute } from 'astro';
import { BlizzardAPI } from '../../lib/blizzard-api';

// Define your characters
const characters = {
  'magicmushies': {
    realm: 'area-52',
    name: 'magicmushies'
  },
  'wtbarm': {
    realm: 'malganis', // Mal'Ganis becomes malganis in API
    name: 'wtbarm'
  },
  'leftylocs': {
    realm: 'turalyon',
    name: 'leftylocs'
  }
};

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get character from query parameter
    const url = new URL(request.url);
    const characterKey = url.searchParams.get('character') || 'magicmushies';
    console.log('API: Requested character:', characterKey);
    console.log('API: Full URL:', url.toString());
    console.log('API: All query params:', Object.fromEntries(url.searchParams));
    
    // Test response to verify parameter is working
    if (characterKey === 'test') {
      return new Response(JSON.stringify({ 
        test: true,
        character: characterKey,
        message: 'Query parameter is working correctly'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const characterInfo = characters[characterKey as keyof typeof characters];
    console.log('API: Character info:', characterInfo);
    
    if (!characterInfo) {
      return new Response(JSON.stringify({ 
        error: 'Character not found',
        data: null 
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const clientId = import.meta.env.BLIZZARD_CLIENT_ID;
    const clientSecret = import.meta.env.BLIZZARD_CLIENT_SECRET;
    const region = import.meta.env.BLIZZARD_REGION || 'us';

    if (!clientId || !clientSecret) {
      return new Response(JSON.stringify({ 
        error: 'Blizzard API not configured',
        data: null 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('API: Creating BlizzardAPI with:', {
      realm: characterInfo.realm,
      characterName: characterInfo.name
    });
    
    const api = new BlizzardAPI({
      clientId,
      clientSecret,
      region,
      realm: characterInfo.realm,
      characterName: characterInfo.name
    });

    const characterData = await api.getCharacterData();
    console.log('API: Character data returned:', characterData?.name, characterData?.realm);
    
    return new Response(JSON.stringify({ 
      data: characterData,
      error: null,
      debug: {
        requested: characterKey,
        characterInfo: characterInfo,
        apiResponse: characterData?.name
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Disable cache for debugging
      }
    });
  } catch (error) {
    console.error('Error in wow-character API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch character data',
      data: null 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60' // Cache errors for 1 minute
      }
    });
  }
};