import type { APIRoute } from 'astro';
import { BlizzardAPI } from '../../lib/blizzard-api';

// Define your characters
const characters = {
  'magicmushies': {
    realm: 'area-52',
    name: 'magicmushies'
  },
  'wtbarm': {
    realm: 'malganis',
    name: 'wtbarm'
  },
  'leftylocs': {
    realm: 'turalyon',
    name: 'leftylocs'
  }
};

export const GET: APIRoute = async () => {
  try {
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

    // Fetch all characters in parallel
    const characterPromises = Object.entries(characters).map(async ([key, characterInfo]) => {
      try {
        console.log(`Fetching ${key}:`, characterInfo);
        
        const api = new BlizzardAPI({
          clientId,
          clientSecret,
          region,
          realm: characterInfo.realm,
          characterName: characterInfo.name
        });

        const characterData = await api.getCharacterData();
        
        return {
          key,
          data: characterData,
          error: null
        };
      } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return {
          key,
          data: null,
          error: `Failed to fetch ${key}`
        };
      }
    });

    const results = await Promise.all(characterPromises);
    
    // Convert array to object keyed by character name
    const characterData = results.reduce((acc, result) => {
      acc[result.key] = result.data;
      return acc;
    }, {} as Record<string, any>);

    return new Response(JSON.stringify({ 
      data: characterData,
      error: null 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error in wow-characters-batch API:', error);
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