const Tesseract = require('tesseract.js');
const TelegramBot = require('node-telegram-bot-api');
const screen = require('./screenshot');
const config = require('./config');
const Eta = require('node-eta');

const bot = new TelegramBot(config.telegram.token, {polling: true});
const worker = Tesseract.createWorker({
    //logger: m => console.log(m)
});

let eta = null;
let queuePosStarted = null;
let queuePos = null;
let lastReportedAt = null;

(async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_char_whitelist: '0123456789',
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
    });

    await getProgress();
})();

const getProgress = async () => {

    const imgBuffer = await screen.capture(false);
    const response = await worker.recognize(imgBuffer);
    const confidence = response.data.confidence;
    const text = response.data.text;

    console.log(text, confidence);

    if (confidence > config.tesseract.confidenceThreshold) {

        if (queuePos !== parseInt(text)) {
            queuePos = parseInt(text);

            if (eta === null) {
                 eta = new Eta(queuePos);
                 eta.start();
                 queuePosStarted = queuePos;
            }

            let reversedPosition = queuePosStarted - queuePos;
            if (reversedPosition === 0) {
                reversedPosition = 1;
            }

            const etaString = eta.format(config.eta.format);
            eta.iterate('message %d', reversedPosition);
            const sendText = `Your position is: ${queuePos} (confidence: ${confidence}). ETA ${etaString}`;
            const now = Math.floor(new Date().getTime() / 1000);

            console.log(sendText);

            if (queuePos < config.reportOftenAboveXQueuePos || lastReportedAt === null || (now - lastReportedAt > config.reportIntervalAboveXInSeconds)) {
                lastReportedAt = now;
                await bot.sendMessage(config.telegram.yourId, sendText);
            }
        }
    }

    setTimeout(() => {
        getProgress();
    }, config.updateFrequencyInSeconds * 1000);
}

bot.on('message', (msg) => {
    config.telegram.yourId = msg.chat.id;
    console.log('Got a message. Please update config.telegram.yourId', config.telegram.yourId);

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(config.telegram.yourId, 'Received your message');
});
