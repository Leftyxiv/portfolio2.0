import React, { useState, useEffect } from 'react';

const AppleMusicPlayer = () => {
  const [music, setMusic] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMusicKit = async () => {
      try {
        // Load MusicKit JS
        const script = document.createElement('script');
        script.src = 'https://js-cdn.music.apple.com/musickit/v3/musickit.js';
        script.async = true;
        
        script.onload = async () => {
          // Get developer token from our API
          const response = await fetch('/api/music-token');
          const { token } = await response.json();

          // Configure MusicKit
          await window.MusicKit.configure({
            developerToken: token,
            app: {
              name: 'Manny Portfolio',
              build: '1.0.0'
            }
          });

          const musicInstance = window.MusicKit.getInstance();
          setMusic(musicInstance);
          
          // Check if user is already authorized
          if (musicInstance.isAuthorized) {
            setIsAuthorized(true);
            await fetchRecentlyPlayed(musicInstance);
          }
          
          setLoading(false);
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize MusicKit:', error);
        setLoading(false);
      }
    };

    initializeMusicKit();
  }, []);

  const authorize = async () => {
    if (music) {
      try {
        await music.authorize();
        setIsAuthorized(true);
        await fetchRecentlyPlayed(music);
      } catch (error) {
        console.error('Authorization failed:', error);
      }
    }
  };

  const fetchRecentlyPlayed = async (musicInstance) => {
    try {
      const response = await musicInstance.api.music('/v1/me/recent/played/tracks', {
        limit: 10
      });
      
      if (response.data && response.data.data) {
        setRecentTracks(response.data.data);
        // Set the most recent track as current
        if (response.data.data.length > 0) {
          setCurrentTrack(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch recently played:', error);
      // Try fetching library instead if recent played fails
      try {
        const libraryResponse = await musicInstance.api.music('/v1/me/library/songs', {
          limit: 10
        });
        if (libraryResponse.data && libraryResponse.data.data) {
          setRecentTracks(libraryResponse.data.data);
          if (libraryResponse.data.data.length > 0) {
            setCurrentTrack(libraryResponse.data.data[0]);
          }
        }
      } catch (libraryError) {
        console.error('Failed to fetch library:', libraryError);
      }
    }
  };

  const playPreview = async (track) => {
    if (music && track.attributes.previews?.[0]) {
      try {
        await music.setQueue({
          url: track.attributes.previews[0].url
        });
        await music.play();
      } catch (error) {
        console.error('Failed to play preview:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-2xl">🎵</div>
        <p className="text-gray-400">Loading Apple Music...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="text-center py-8">
        <button
          onClick={authorize}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center gap-2 mx-auto"
        >
          <span>🎵</span>
          Connect Apple Music
        </button>
        <p className="text-gray-400 text-sm mt-4">
          Sign in to see what I'm currently playing
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Currently Playing / Most Recent */}
      {currentTrack && (
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
          <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            Recently Played
          </h3>
          <div className="flex gap-4 items-center">
            {currentTrack.attributes.artwork && (
              <img
                src={currentTrack.attributes.artwork.url.replace('{w}', '200').replace('{h}', '200')}
                alt={currentTrack.attributes.albumName}
                className="w-24 h-24 rounded-lg shadow-lg"
              />
            )}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">{currentTrack.attributes.name}</h4>
              <p className="text-gray-400">{currentTrack.attributes.artistName}</p>
              <p className="text-sm text-gray-500">{currentTrack.attributes.albumName}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => playPreview(currentTrack)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2"
                >
                  ▶️ Preview
                </button>
                <a
                  href={`https://music.apple.com/us/album/${currentTrack.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2"
                >
                  🍎 Open in Apple Music
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Tracks */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-red-900/50">
        <h3 className="text-2xl font-bold text-red-400 mb-4">Recent Rotation</h3>
        <div className="space-y-3">
          {recentTracks.slice(1, 6).map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => playPreview(track)}
            >
              {track.attributes.artwork && (
                <img
                  src={track.attributes.artwork.url.replace('{w}', '60').replace('{h}', '60')}
                  alt={track.attributes.albumName}
                  className="w-12 h-12 rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-bold text-white text-sm">{track.attributes.name}</p>
                <p className="text-gray-400 text-xs">{track.attributes.artistName}</p>
              </div>
              <span className="text-gray-500 text-xs">▶️</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppleMusicPlayer;