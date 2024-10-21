import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const stream: Writable<HTMLMediaElement | null> = writable(null);
