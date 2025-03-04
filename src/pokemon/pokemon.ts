import {BasePokemon, Pokemon} from "./types.ts";

const POKEMONS_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100'

interface FetchBasePokemonsResponse {
    results: BasePokemon[]
    count: number
    previous?: string
    next?: string
}

async function fetchBasePokemons(): Promise<FetchBasePokemonsResponse> {
    const resp = await fetch(POKEMONS_API_URL)
    return await resp.json()
}

async function fetchPokemon(url: string): Promise<Pokemon> {
    const resp = await fetch(url)
    return await resp.json()
}

async function fetchAllPokemons(): Promise<Pokemon[]> {
    const { results: pokemons } = await fetchBasePokemons()
    const promises = pokemons.map(pokemon => fetchPokemon(pokemon.url))
    return await Promise.all(promises)
}

export { fetchAllPokemons }