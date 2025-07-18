import React, { useState, useEffect } from 'react';

const YouTubeMusicPlayer = ({ apiKey }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Your curated metal playlists - add your own playlist IDs here!
  const featuredPlaylists = [
    {
      id: 'PL892hVFbsO0jJnt_UOXz-Ks1vJjOflgmy',
      title: 'Louder Than Life 2025 Festival Mix',
      description: 'Getting ready for the ultimate metal festival'
    },
    {
      id: 'PL892hVFbsO0ir262LRUQsrzpgZZhJtQxR',
      title: 'Louder Than Life 2024',
      description: 'Memories from last year\'s epic festival'
    },
    {
      id: 'LRSRj3l4xiivqmp0jqRz5U16i1IUt-fHRnB75',
      title: 'Spring Recap',
      description: 'Fresh finds and new obsessions'
    }
  ];

  // Fetch playlist details if you want to show video counts, thumbnails, etc.
  useEffect(() => {
    if (apiKey && apiKey !== 'your_youtube_api_key_here') {
      fetchPlaylistDetails();
    }
  }, [apiKey]);

  const fetchPlaylistDetails = async () => {
    setLoading(true);
    try {
      const playlistIds = featuredPlaylists.map(p => p.id).join(',');
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistIds}&key=${apiKey}`
      );
      const data = await response.json();
      
      if (data.items) {
        const enrichedPlaylists = featuredPlaylists.map(playlist => {
          const details = data.items.find(item => item.id === playlist.id);
          return {
            ...playlist,
            thumbnail: details?.snippet?.thumbnails?.medium?.url,
            videoCount: details?.contentDetails?.itemCount
          };
        });
        setPlaylists(enrichedPlaylists);
      }
    } catch (error) {
      console.error('Failed to fetch playlist details:', error);
      setPlaylists(featuredPlaylists); // Fall back to basic info
    }
    setLoading(false);
  };

  const loadPlaylist = (playlistId) => {
    setCurrentVideo(playlistId);
    setShowPlayer(true);
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {showPlayer && currentVideo && (
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/videoseries?list=${currentVideo}&autoplay=1`}
              title="YouTube playlist player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => setShowPlayer(false)}
            className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to playlists
          </button>
        </div>
      )}

      {/* Playlist Selection */}
      {!showPlayer && (
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
          <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">📺</span>
            Metal Playlists
          </h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-pulse text-2xl">🎸</div>
              <p className="text-gray-400">Loading playlists...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(playlists.length > 0 ? playlists : featuredPlaylists).map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => loadPlaylist(playlist.id)}
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group"
                >
                  {playlist.thumbnail ? (
                    <img
                      src={playlist.thumbnail}
                      alt={playlist.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center text-3xl">
                      🎸
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {playlist.title}
                    </h4>
                    <p className="text-sm text-gray-400">{playlist.description}</p>
                    {playlist.videoCount && (
                      <p className="text-xs text-gray-500 mt-1">{playlist.videoCount} videos</p>
                    )}
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    ▶️
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-3">Check out my full collection</p>
            <div className="flex gap-4">
              <a
                href="https://music.youtube.com/channel/UCforXGa-pZ259RRZsVCOHTg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                My YouTube Music Channel
                <span className="text-sm">→</span>
              </a>
              <a
                href="https://music.youtube.com/channel/UCforXGa-pZ259RRZsVCOHTg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                All Playlists
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
        <h3 className="text-xl font-bold text-red-400 mb-4">Quick Metal Fixes</h3>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://music.youtube.com/playlist?list=PL892hVFbsO0jJnt_UOXz-Ks1vJjOflgmy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            <span className="text-2xl block mb-1">🤘</span>
            <span className="text-sm">LTL 2025</span>
          </a>
          <a
            href="https://music.youtube.com/playlist?list=PL892hVFbsO0ir262LRUQsrzpgZZhJtQxR"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            <span className="text-2xl block mb-1">🎸</span>
            <span className="text-sm">LTL 2024</span>
          </a>
          <a
            href="https://music.youtube.com/playlist?list=LRSRj3l4xiivqmp0jqRz5U16i1IUt-fHRnB75"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            <span className="text-2xl block mb-1">💀</span>
            <span className="text-sm">Spring Recap</span>
          </a>
          <a
            href="https://music.youtube.com/channel/UCforXGa-pZ259RRZsVCOHTg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            <span className="text-2xl block mb-1">🔥</span>
            <span className="text-sm">My Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default YouTubeMusicPlayer;