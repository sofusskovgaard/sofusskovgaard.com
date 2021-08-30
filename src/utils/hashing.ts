async function hash(string: string) {
  return await crypto.subtle.digest("SHA-1", Buffer.from(string))
}

export default hash