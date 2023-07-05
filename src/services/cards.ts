import type { CardResponse } from "~/interfaces/card.interface";

export interface CardsParams {
  number: number;
  offset: number;
}

export const getCards = async ({ number, offset }: CardsParams) => {
  const response = await fetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${number}&offset=${offset}`
  );
  return response.json() as unknown as CardResponse;
};
