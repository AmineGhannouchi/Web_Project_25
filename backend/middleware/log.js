const { format } = require('date-fns');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const Time = `${format(new Date(), 'HH:mm:ss')}`;
    const logeDate = format(new Date(), 'yyyyMMdd');
    const logItem = `${Time}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', logeDate + '.log'), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;