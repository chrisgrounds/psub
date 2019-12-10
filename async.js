module.exports = {
  sync: fn => fn(),
  async: fn => setTimeout(fn, 0)
}
