import { LinkChecker } from 'linkinator'
import chalk from 'chalk'

const checker = new LinkChecker()

const LOGGER_MAP = {
    OK: chalk.green("✓"),
    BROKEN: chalk.red("X"),
    SKIPPED: chalk.yellow("?"),
}

let brokenLinks = []

checker.on('link', (link) => {
    //console.log(link)
    //process.stdout.write(LOGGER_MAP[link.state])

    if (link.state === 'BROKEN') {
        brokenLinks.push(link);
    }
});

await checker.check({path: 'https://reactrouter.com/en/main/start/overview', recurse: true})

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