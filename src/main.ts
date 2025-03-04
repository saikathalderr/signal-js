import './style.css'
import {createEffect, createSignal} from "./signal/signal.ts";
import {Pokemon} from "./pokemon/types.ts";
import {fetchAllPokemons} from "./pokemon/pokemon.ts";

const list = document.querySelector<HTMLDivElement>('#list')!
const info = document.querySelector<HTMLDivElement>('#info')!
const search = document.querySelector<HTMLInputElement>('#search')!

const [pokemons, setPokemons] = createSignal<Pokemon[]>([])
const [selectedPokemon, setSelectedPokemon] = createSignal<Pokemon | null>(null)
const [searchText, setSearchText] = createSignal<string>('')
const [loading, setLoading] = createSignal<boolean>(false)

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
            <h2 class="text-xl font-bold h-10">${selectedPokemon()?.name}</h2>
            <div>Height - ${selectedPokemon()?.height}</div>
            <div>Weight - ${selectedPokemon()?.weight}</div>
        `
    } else {
        info.innerHTML = ''
    }
})

createEffect(() => {
    if (searchText()) {
        const searchResult = searchPokemon(searchText())
        if (searchResult.length > 0) {
            setPokemons(searchResult)
        }
    }
})

createEffect(() => {
    if (loading()) {
        list.innerHTML = 'Loading...'
    }
})

search.addEventListener('input', (e: Event) => {
    const value = (e.target as HTMLInputElement).value.toLowerCase()
    if (value.length <= 2) {
        init()
        return
    }
    setSearchText(value)
})

function searchPokemon(key: string) {
    return pokemons().filter(pokemon => pokemon.name.includes(key))
}

function init() {
  setLoading(true)

    fetchAllPokemons().then(pokemons => {
        setPokemons(pokemons)
    })
    .finally(() => setLoading(false))

}

init()