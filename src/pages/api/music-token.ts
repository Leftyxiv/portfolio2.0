import type { APIRoute } from 'astro';
import jwt from 'jsonwebtoken';

export const GET: APIRoute = async () => {
  try {
    // Get credentials from environment variables
    const teamId = import.meta.env.APPLE_TEAM_ID || '246UA9G9AW';
    const keyId = import.meta.env.APPLE_KEY_ID || '3FCBQ235WK';
    const privateKey = import.meta.env.APPLE_PRIVATE_KEY;
    
    if (!privateKey || privateKey.includes('YOUR_PRIVATE_KEY_CONTENT_HERE')) {
      return new Response(JSON.stringify({ error: 'Private key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = jwt.sign({}, privateKey, {
      algorithm: 'ES256',
      expiresIn: '180d',
      issuer: teamId,
      header: {
        alg: 'ES256',
        kid: keyId
      }
    });

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};