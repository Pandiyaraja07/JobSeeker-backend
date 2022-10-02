const logger = {
  log: (log) => console.log(log),
  error: (err) => console.error(JSON.stringify(err)),
  debug: (deb) => console.debug(deb),
};

module.exports = { logger };
