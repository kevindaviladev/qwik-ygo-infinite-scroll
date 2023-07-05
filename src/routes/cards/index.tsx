/* eslint-disable qwik/jsx-key */
/* eslint-disable qwik/jsx-img */
import {
  $,
  component$,
  useOnDocument,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { Card } from "~/interfaces/card.interface";
import { getCards } from "~/services/cards";

interface CardState {
  cards: Card[];
  offset: number;
  isLoading: boolean;
}

export default component$(() => {
  const cardState = useStore<CardState>({
    cards: [],
    offset: 0,
    isLoading: false,
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxPossibleScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      if (currentScroll + 100 >= maxPossibleScroll && !cardState.isLoading) {
        console.log("Scroll!");
        cardState.offset = cardState.offset + 10;
        cardState.isLoading = true;
      }
    })
  );

  useVisibleTask$(async ({ track }) => {
    track(() => cardState.offset);
    const cards = await getCards({ number: 10, offset: cardState.offset });
    cardState.cards = [...cardState.cards, ...cards.data];
    cardState.isLoading = false;
  });

  return (
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 place-items-center mb-4">
      {cardState.cards.map((card) => (
        <div class="min-h-[360px] w-[300px] flex flex-col justify-center items-center border-2 border-black rounded-md p-8">
          <img
            src={card.card_images[0].image_url}
            alt={card.name}
            height={360}
            width={300}
          />
          <h1>{card.name}</h1>
        </div>
      ))}
      <div>{cardState.isLoading && <p>Loading...</p>}</div>
    </div>
  );
});
