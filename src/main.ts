import './style.css'
import {createEffect, createSignal} from "./signal/signal.ts";
import {Pokemon} from "./pokemon/types.ts";
import {fetchAllPokemons} from "./pokemon/pokemon.ts";

const list = document.querySelector<HTMLDivElement>('#list')!
const info = document.querySelector<HTMLDivElement>('#info')!

const [pokemons, setPokemons] = createSignal<Pokemon[]>([])
const [selectedPokemon, setSelectedPokemon] = createSignal<Pokemon | null>(null)

createEffect(() => {
    list.innerHTML = pokemons().map(pokemon => `
        <div class="flex items-center cursor-pointer hover:bg-red-100"
             id="${pokemon.name}"
        >
            <img class="w-8" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <div class="text-xs capitalize">${pokemon.name}</div>
        </div>
    `).join('');

    pokemons().forEach(pokemon => {
        document.getElementById(pokemon.name)?.addEventListener('click', () => {
            setSelectedPokemon(pokemon);
        });
    });
})

createEffect(() => {
    if (selectedPokemon()) {
        info.innerHTML = `
            <img src="${selectedPokemon()?.sprites.front_default}" alt="${selectedPokemon()?.name}" />
            <h2 class="text-xl font-bold">${selectedPokemon()?.name}</h2>
            <div>Height - ${selectedPokemon()?.height}</div>
            <div>Weight - ${selectedPokemon()?.weight}</div>
        `
    } else {
        info.innerHTML = ''
    }
})


fetchAllPokemons().then(setPokemons)

