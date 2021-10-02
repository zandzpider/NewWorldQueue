# NewWorldQueue
NodeJS screen reader for reading your NewWorld queue and sending it to Telegram

### This comes with no support and was made because i was tired of looking at the queue via remote
It takes a screenshot of your screen and tries to parse it with OCR.
If it's within reason, it sends the queue and ETA to your telegram.

It's made quicky and dirty so feel free to modify and improve and create PR's.

(My first attempt with Tesseract and OCR, so it's a best-effort-random effort here)

## Dependencies
- Ran locally on NodeJS v16.8.0
- Tesseract 4.1.*
    - https://github.com/tesseract-ocr/tesseract#installing-tesseract
    - https://digi.bib.uni-mannheim.de/tesseract/
    - https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v4.1.0.20190314.exe
      ( Add the tesseract so it's available to your PATH )
- Telegram bot
    - https://core.telegram.org/bots


## Running and installing
```bash
npm install
node index.js
```

![image](https://user-images.githubusercontent.com/321691/135719108-b535431b-6ce1-4a90-ba25-a8321d76f675.png)
![image](https://user-images.githubusercontent.com/321691/135719102-917c99b4-cf15-4fb9-b317-bd1d15bc974d.png)
