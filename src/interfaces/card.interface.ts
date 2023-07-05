export interface CardResponse {
  data: Card[];
  meta: CardResponseMetaData;
}

interface CardResponseMetaData {
  current_rows: number;
  total_rows: number;
  rows_remaining: number;
  total_pages: number;
  pages_remaining: number;
  next_page: string;
  next_page_offset: number;
}

export interface Card {
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  race: string;
  archetype: string;
  card_sets: Cardset[];
  card_images: Cardimage[];
  card_prices: Cardprice[];
}

interface Cardprice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

interface Cardimage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

interface Cardset {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}