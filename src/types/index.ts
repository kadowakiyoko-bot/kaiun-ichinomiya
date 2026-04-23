export interface KaiunFood {
  name: string;
  "店または場所"?: string;
  店?: string;
  効能: string;
  エピソード?: string;
}

export interface Omamori {
  name: string;
  初穂料: string;
  特徴: string;
  どんな人向け: string;
}

export interface SecretStory {
  title: string;
  内容: string;
  ソース: string;
}

export interface Sanpai {
  最寄り駅: string;
  駐車場: string;
  授与所受付時間: string;
  御朱印初穂料: string;
}

export interface Season {
  春: string;
  夏: string;
  秋: string;
  冬: string;
}

export interface SoloAccess {
  電車のみで完結可: boolean;
  駅から徒歩可: boolean;
  最終アクセス難易度: string;
  女性一人歩き安全性コメント: string;
}

export interface Shrine {
  id: string;
  name: string;
  読み: string;
  旧国: string;
  都道府県: string;
  住所: string;
  緯度: number;
  経度: number;
  創建: string;
  主祭神: string;
  配祀神: string[];
  ご利益: string[];
  開運キーワード: string;
  開運フード: KaiunFood;
  必買お守り: Omamori[];
  秘密の話: SecretStory[];
  女性人気ポイント: string;
  参拝情報: Sanpai;
  公式URL: string;
  参拝所要時間: string;
  ベストシーズン: Season;
  セット参拝コース: string[];
  一人旅アクセス: SoloAccess;
  imageUrl?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  imageSource?: string | null;
  imageSourcePage?: string;
  imageAttribution?: string | null;
}

export interface StampRecord {
  shrineId: string;
  visitedAt: string;
  memo?: string;
}

export type GoriyakuCategory =
  | "縁結び"
  | "勝負運"
  | "金運"
  | "厄除け"
  | "健康長寿"
  | "学業成就"
  | "安産子育て"
  | "家内安全"
  | "その他";

export type AccessDifficulty = "易" | "中" | "難";
