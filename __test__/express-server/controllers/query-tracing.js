const pino = require('pino');
const logger = pino();

const queryLevelTracing = (req, res, next) => {
  // Save the start time in a variable
  const startHrTime = process.hrtime();

  console.log('req.params:', req.params);
  // When request is finished
  res.on("finish", () => {
    // If there is a req.body and operationName in the body
    if (req.body && req.body.operationName) {
      // Calculate the elapsed time
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      logger.info({
        type: "timing",
        name: req.body.operationName,
        ms: elapsedTimeMs
      })
    }
  });
  return next();
}

module.exports = queryLevelTracing ;