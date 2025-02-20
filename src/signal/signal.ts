type EffectCallback = () => void

let effectCallback: EffectCallback | null = null

class Signal<T> {
    private value: T;
    private subscribers: ((value: T) => void)[];

    constructor(value: T) {
        this.value = value;
        this.subscribers = [];
    }

    getValue() {
        return this.value;
    }

    setValue(newValue: T) {
        this.value = newValue;
        this.emit();
    }

    emit() {
        this.subscribers.forEach((subscriber) => subscriber(this.value));
    }

    subscribe(callback: (value:T) => void) {
        this.subscribers.push(callback);
    }
}

export function createSignal<T>(initialValue: T): [() => T, (newValue: T) => void] {
    const signal = new Signal(initialValue);
    return [
        () => {
            if (effectCallback) {
                signal.subscribe(effectCallback);
            }
            return signal.getValue()
        },
        (newValue: T) => signal.setValue(newValue),
    ];
}

export const createEffect = (callback: () => void) => {
    effectCallback = callback;
    callback();
    effectCallback = null;
};