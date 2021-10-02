const sharp = require('sharp');
const screenshot = require('screenshot-desktop');
const config = require('./config');
const sizeOf = require('image-size');


const capture = async () => {

    let captureConfig = {
        format: 'png',
    }

    if (config.debug) {
        captureConfig.filename = 'screenshot.png';
    }

    const imgBuffer = await screenshot(captureConfig);
    const dimensions = await sizeOf(imgBuffer);

    const cropArea = {
        left: dimensions.width / 2 - config.screenshot.leftOffset,
        top: dimensions.height / 2 - config.screenshot.topOffset,
        width: config.screenshot.width,
        height: config.screenshot.height,
    }

    if (config.debug) {
        sharp(imgBuffer)
            .extract(cropArea)
            .png()
            .toFile('screenshot-cropped.png');
    }

    return await sharp(imgBuffer)
        .extract(cropArea)
        .png()
        .toBuffer();
}

exports.capture = capture;
