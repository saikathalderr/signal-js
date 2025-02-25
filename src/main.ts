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
        <div class="flex items-center"
                onclick="() => setSelectedPokemon(pokemon)"
        >
            <img class="w-10" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <div>${pokemon.name}</div>
        </div>
`).join('')
})

createEffect(() => {
    if (selectedPokemon()) {
        info.innerHTML = `
            <h2>${selectedPokemon()?.name}</h2>
            <img src="${selectedPokemon()?.sprites.front_default}" alt="${selectedPokemon()?.name}" />
            <div>Height: ${selectedPokemon()?.height}</div>
            <div>Weight: ${selectedPokemon()?.weight}</div>
        `
    } else {
        info.innerHTML = ''
    }
})


fetchAllPokemons().then(setPokemons)

