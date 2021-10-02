module.exports = {
    debug: false, // will dump full and cropped image + some potential debug info
    updateFrequencyInSeconds: 5,
    reportIntervalAbove100InSeconds: 600,
    telegram: {
        token: '',
        yourId: 0, // You need to send a message to your bot, so you can know your own chatId
    },
    screenshot: {
        leftOffset: 100,
        topOffset: 60,
        width: 300,
        height: 50,
    },
    tesseract: {
        confidenceThreshold: 75,
    },
    eta: {
        format: '{{etah}}',
    }
}
