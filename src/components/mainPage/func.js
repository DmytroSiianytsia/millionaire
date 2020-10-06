export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomOrder(arr) {
  const copyArr = arr.slice()
  const newArr = []
  while (copyArr.length) {
    let randomIndex = getRandomInt(0, copyArr.length)
    let item = copyArr.splice(randomIndex, 1)
    newArr.push(item[0])
  }
  return newArr
}
