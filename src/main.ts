import './style.css'
import {createEffect, createSignal} from "./signal/signal.ts";

const [countValue, setCountValue] = createSignal(0)

const COUNT_INITIAL_MESSAGE = '👀 Bro, press the button 👇'
const FUN_INITIAL_MESSAGE = '""'

const count = document.querySelector<HTMLSpanElement>('#count')!
const fun = document.querySelector<HTMLSpanElement>('#fun')!

const btn = document.querySelector<HTMLButtonElement>('#btn')!
const resetBtn = document.querySelector<HTMLButtonElement>('#reset')!

createEffect(() => {
    if (countValue() <= 0) {
        init()
    } else {
        resetBtn.disabled = false
        count.innerText = `👉 ${countValue()} 👈`

        switch (countValue()) {
            case 1:
                fun.innerText = '🤨'
                break
            case 2:
                fun.innerText = '😐'
                break
            case 3:
                fun.innerText = '😕'
                break
            case 4:
                fun.innerText = '😟'
                break
            case 5:
                fun.innerText = '😦'
                break
            case 6:
                fun.innerText = '😧'
                break
            case 7:
                fun.innerText = '😮'
                break
            case 8:
                fun.innerText = '😲'
                break
            case 9:
                fun.innerText = '😵'
                break
            case 10:
                fun.innerText = '🤯'
                break
            case 11:
                fun.innerText = '🤩'
                break
            case 12:
                fun.innerText = '🥳'
                break
            case 13:
                fun.innerText = '🤪'
                break
            case 14:
                fun.innerText = '😜'
                break
            case 15:
                fun.innerText = '😝'
                break
            case 16:
                fun.innerText = '😛'
                break
            case 17:
                fun.innerText = '😋'
                break
            case 18:
                fun.innerText = '😚'
                break
            case 19:
                fun.innerText = '😙'
                break
            case 20:
                fun.innerText = '😗'
                break
            case 21:
                fun.innerText = '😘'
                break

            default:
                fun.innerText = 'Ok, that\'s enough 😅'
                break
        }
    }
})

function increment() {
    setCountValue(countValue() + 1)
}

function reset() {
    setCountValue(0)
    resetBtn.disabled = true
    init()
}

function init() {
    resetBtn.disabled = true
    count.innerText = COUNT_INITIAL_MESSAGE
    fun.innerText = FUN_INITIAL_MESSAGE
}

btn.addEventListener('click', increment)
resetBtn.addEventListener('click', reset)

