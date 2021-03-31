import { v4 as uuid } from "uuid"

export function randomUuid() {
  return uuid()
}

export function randomInteger(min: number = 1, max: number = 1000) {
  const minInt = Math.floor(min)
  const maxInt = Math.floor(max)
  const range = maxInt - minInt + 1
  return minInt + Math.floor(Math.random() * range)
}
