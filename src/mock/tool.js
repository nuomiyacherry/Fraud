export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function pickOne(data) {
  return data[Math.floor(Math.random() * data.length)]
}
