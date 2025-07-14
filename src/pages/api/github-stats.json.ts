import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username') || 'leftyxiv';
    
    // GitHub stats card URL - this is a public service that doesn't require tokens
    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=f97316&text_color=94a3b8&icon_color=f97316`;
    
    // Language stats URL
    const languagesUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=f97316&text_color=94a3b8`;
    
    // Contribution graph URL
    const contributionsUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=0D1117&ring=F97316&fire=F97316&currStreakLabel=F97316`;
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        username,
        statsUrl,
        languagesUrl,
        contributionsUrl,
        profileUrl: `https://github.com/${username}`,
        // You could add more GitHub API calls here if needed
        // but for now we're using the public stats services
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error in github-stats API:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch GitHub stats'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};