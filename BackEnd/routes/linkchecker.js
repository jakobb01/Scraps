const { LinkChecker } = require('linkinator')
const chalk = require('chalk')

const LOGGER_MAP = {
    OK: chalk.green("✓"),
    BROKEN: chalk.red("X"),
    SKIPPED: chalk.yellow("?"),
}

async function linkchecker(url) {
    const checker = new LinkChecker()
    let brokenLinks = []

    checker.on('link', (link) => {
        //console.log(link)
        //process.stdout.write(LOGGER_MAP[link.state])

        if (link.state === 'BROKEN') {
            brokenLinks.push(link);
        }
    });

    await checker.check({path: url, recurse: true})

    if (brokenLinks.length > 0) {
        console.log('');
        console.log(`Found ${brokenLinks.length} broken links:`);
        for (const brokenLink of brokenLinks) {
            console.log(' ');
            console.log(brokenLink.url);
            console.log(' ' + 'STATUS: ' + brokenLink.status);
            console.log(' ' + 'SOURCE: ' + new URL(brokenLink.parent).pathname);
        }

    }
}

module.exports = linkchecker;
