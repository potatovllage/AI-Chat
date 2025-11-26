export interface Character {
  id: string;
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
  owner: string;
}

// 캐릭터 생성 입력 타입
export interface CreateCharacterInput {
  name: string;
  description: string;
  prompt: string;
  thumbnail: string;
}

// 캐릭터 생성 응답 타입
export interface CreateCharacterResponse {
  message: string;
  character: Character;
}

export interface GetCharactersResponse {
  characters: Character[];
}
