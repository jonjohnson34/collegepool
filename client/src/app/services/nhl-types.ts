export interface NHLGame {
  id: string;
  gameId?: string;
  date: string;
  status: string;
  homeTeam: {
    name: string;
    abbreviation: string;
    score: number;
    logo?: string;
  };
  awayTeam: {
    name: string;
    abbreviation: string;
    score: number;
    logo?: string;
  };
  venue?: string;
  broadcast?: string;
  season?: string;
}



export interface GamePick {
  id?: string;
  userId: string;
  gameId: string;
  pickedTeam: 'home' | 'away';
  gameDate: string;
  createdAt?: Date;
  isCorrect?: boolean;
  season?: string;
}

export interface UserStanding {
  userId: string;
  username: string;
  correctPicks: number;
  totalPicks: number;
  winPercentage: number;
  rank: number;
} 