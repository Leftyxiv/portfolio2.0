// Blizzard API client for fetching WoW character data
interface BlizzardConfig {
  clientId: string;
  clientSecret: string;
  region: string;
  realm: string;
  characterName: string;
}

interface CharacterData {
  name: string;
  realm: string;
  level: number;
  race: string;
  class: string;
  faction: string;
  guild?: string;
  achievementPoints: number;
  itemLevel: number;
  avatar?: string;
  renderUrl?: string;
  lastLogin?: Date;
}

class BlizzardAPI {
  private config: BlizzardConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: BlizzardConfig) {
    this.config = config;
    console.log('BlizzardAPI constructor called with:', {
      realm: config.realm,
      characterName: config.characterName
    });
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    // Get new token from Blizzard OAuth
    const tokenUrl = `https://${this.config.region}.battle.net/oauth/token`;
    const credentials = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      // Set expiry 5 minutes before actual expiry for safety
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Blizzard access token:', error);
      throw error;
    }
  }

  async getCharacterData(): Promise<CharacterData | null> {
    try {
      const token = await this.getAccessToken();
      const namespace = `profile-${this.config.region}`;
      const locale = this.config.region === 'us' ? 'en_US' : 'en_GB';
      
      // Fetch character profile
      const profileUrl = `https://${this.config.region}.api.blizzard.com/profile/wow/character/${this.config.realm.toLowerCase()}/${this.config.characterName.toLowerCase()}`;
      
      console.log('BlizzardAPI: Fetching character from:', profileUrl);
      
      const response = await fetch(`${profileUrl}?namespace=${namespace}&locale=${locale}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch character data:', response.statusText);
        return null;
      }

      const data = await response.json();

      // Fetch character media for avatar
      const mediaResponse = await fetch(`${profileUrl}/character-media?namespace=${namespace}&locale=${locale}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      let avatar = '';
      let renderUrl = '';
      
      if (mediaResponse.ok) {
        const mediaData = await mediaResponse.json();
        console.log('Media data for', data.name, ':', mediaData);
        avatar = mediaData.assets?.find((asset: any) => asset.key === 'avatar')?.value || '';
        renderUrl = mediaData.assets?.find((asset: any) => asset.key === 'main')?.value || '';
        
        // Try different render keys if main is not available
        if (!renderUrl) {
          renderUrl = mediaData.assets?.find((asset: any) => asset.key === 'main-raw')?.value || '';
        }
      }

      // Fetch achievements summary
      const achievementsData = await this.getCharacterAchievements();

      return {
        name: data.name,
        realm: data.realm.name,
        level: data.level,
        race: data.race.name,
        class: data.character_class.name,
        faction: data.faction.name,
        guild: data.guild?.name,
        achievementPoints: data.achievement_points || 0,
        itemLevel: data.equipped_item_level || 0,
        avatar,
        renderUrl,
        lastLogin: data.last_login_timestamp ? new Date(data.last_login_timestamp) : undefined,
        achievements: achievementsData
      };
    } catch (error) {
      console.error('Error fetching character data:', error);
      return null;
    }
  }

  async getCharacterAchievements() {
    try {
      const token = await this.getAccessToken();
      const namespace = `profile-${this.config.region}`;
      const locale = this.config.region === 'us' ? 'en_US' : 'en_GB';
      
      const url = `https://${this.config.region}.api.blizzard.com/profile/wow/character/${this.config.realm.toLowerCase()}/${this.config.characterName.toLowerCase()}/achievements`;
      
      const response = await fetch(`${url}?namespace=${namespace}&locale=${locale}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log('Failed to fetch achievements');
        return null;
      }

      const data = await response.json();
      
      // Get recent completed achievements
      const recentAchievements = [];
      
      if (data.achievements) {
        // Sort by completion timestamp and get the 6 most recent
        const sortedAchievements = data.achievements
          .filter((ach: any) => ach.completed_timestamp)
          .sort((a: any, b: any) => b.completed_timestamp - a.completed_timestamp)
          .slice(0, 6);
        
        // Fetch details for each achievement
        for (const achievement of sortedAchievements) {
          try {
            const achievementUrl = `https://${this.config.region}.api.blizzard.com/data/wow/achievement/${achievement.id}`;
            const detailResponse = await fetch(`${achievementUrl}?namespace=static-${this.config.region}&locale=${locale}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            
            if (detailResponse.ok) {
              const detail = await detailResponse.json();
              
              // Fetch media/icon if available
              let iconUrl = null;
              if (detail.media?.id) {
                try {
                  const mediaUrl = `https://${this.config.region}.api.blizzard.com/data/wow/media/achievement/${detail.media.id}`;
                  const mediaResponse = await fetch(`${mediaUrl}?namespace=static-${this.config.region}&locale=${locale}`, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                  });
                  
                  if (mediaResponse.ok) {
                    const mediaData = await mediaResponse.json();
                    iconUrl = mediaData.assets?.[0]?.value || null;
                  }
                } catch (err) {
                  console.error('Error fetching achievement icon:', err);
                }
              }
              
              recentAchievements.push({
                id: achievement.id,
                name: detail.name,
                description: detail.description,
                points: detail.points,
                completedTimestamp: achievement.completed_timestamp,
                icon: iconUrl,
                category: detail.category?.name
              });
            }
          } catch (err) {
            console.error('Error fetching achievement detail:', err);
          }
        }
      }
      
      return {
        recent: recentAchievements,
        totalPoints: data.total_points || 0,
        totalAchievements: data.total_quantity || 0
      };
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return null;
    }
  }

  async getCharacterStats() {
    try {
      const token = await this.getAccessToken();
      const namespace = `profile-${this.config.region}`;
      const locale = this.config.region === 'us' ? 'en_US' : 'en_GB';
      
      const url = `https://${this.config.region}.api.blizzard.com/profile/wow/character/${this.config.realm.toLowerCase()}/${this.config.characterName.toLowerCase()}/statistics`;
      
      const response = await fetch(`${url}?namespace=${namespace}&locale=${locale}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching character stats:', error);
      return null;
    }
  }
}

// Factory function to create API instance
export function createBlizzardAPI(): BlizzardAPI | null {
  const clientId = import.meta.env.BLIZZARD_CLIENT_ID;
  const clientSecret = import.meta.env.BLIZZARD_CLIENT_SECRET;
  const region = import.meta.env.BLIZZARD_REGION || 'us';
  const realm = import.meta.env.BLIZZARD_REALM;
  const characterName = import.meta.env.BLIZZARD_CHARACTER_NAME;

  if (!clientId || !clientSecret || !realm || !characterName) {
    console.warn('Blizzard API credentials not configured');
    return null;
  }

  return new BlizzardAPI({
    clientId,
    clientSecret,
    region,
    realm,
    characterName,
  });
}

export type { CharacterData };
export { BlizzardAPI };