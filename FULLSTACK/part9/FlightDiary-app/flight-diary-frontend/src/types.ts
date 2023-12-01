export enum Weather {
    Default = '',
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}
  
export enum Visibility {
    Default = '',
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}
  
export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}

export type NewDiary = Omit<DiaryEntry, 'id'>