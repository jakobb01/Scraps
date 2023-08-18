const link = require('linkinator')
const chalk = require('chalk')

const LOGGER_MAP = {
    OK: chalk.green("✓"),
    BROKEN: chalk.red("X"),
    SKIPPED: chalk.yellow("?"),
}

async function linkchecker(url) {
    const checker = new link.LinkChecker()
    let brokenLinks = []
    let count = 0;
    let json = {};

    checker.on('link', (link) => {
        //console.log(link.status)
        //process.stdout.write(LOGGER_MAP[link.state])
        count++;

        if (link.state === 'BROKEN') {
            brokenLinks.push({
                url: link.url,
                status: link.status,
                state: link.state,
                parent: link.parent
            });
        }
    });

    try {
        await checker.check({path: url, recurse: true})
    } catch (err) {
        console.error(err)
    }

    /*
    if (brokenLinks.length > 0) {
        console.log('');
        console.log(`Found ${brokenLinks.length} broken links out of ${count} links`);
        console.log(`That's ${Math.round((brokenLinks.length / count) * 100)}% of all links`);
    }
     */

    return {
        url: url,
        numofbroken: brokenLinks.length,
        numofall: count,
        percent: Math.round((brokenLinks.length / count) * 100),
        brokenlinks: brokenLinks
    }
}

module.exports = linkchecker;
