/* eslint-disable qwik/jsx-key */
/* eslint-disable qwik/jsx-img */
import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { getCards } from "~/services/cards";

export default component$(() => {
  const cardsResource = useResource$(() => getCards({ number: 10, offset: 0 }));

  return (
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 place-items-center mb-4">
      <Resource
        value={cardsResource}
        onPending={() => <p>Loading...</p>}
        onResolved={({ data }) => (
          <>
            {data.map((card) => (
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
          </>
        )}
      />
    </div>
  );
});
