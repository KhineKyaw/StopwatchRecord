const denominator2 = 1000 * 60
const denominator = denominator2 * 60

const formatZero = str => {
  if (str.length > 2) return ""
  else return `${"0".repeat(2 - str.length)}`
}

const parseTimeMillis = timeMillis => {
  const hours = Math.floor(timeMillis / denominator).toString()
  const minutes = Math.floor(
    (timeMillis % denominator) / denominator2
  ).toString()
  const seconds = Math.floor((timeMillis % denominator2) / 1000).toString()
  return `${formatZero(hours)}${hours}:${formatZero(
    minutes
  )}${minutes}:${formatZero(seconds)}${seconds}`
}

export default parseTimeMillis
