export function random(n: number) {
	return Math.round(Math.random() * n);
}

export function mod(factor: number, modN: number) {
	return Math.round(factor - Math.floor(factor / modN) * modN);
}

export function arrLenght(length: number, callback: Function) {
	return Array(length + 1)
		.fill(0)
		.map((x) => callback(x));
}
