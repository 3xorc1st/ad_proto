import Parser from 'rss-parser';

export interface FeedItem {
    title?: string;
    link?: string;
    pubDate?: string;
    contentSnippet?: string;
}

export class RSSFeedIntegration {
    private parser: Parser;

    constructor() {
        this.parser = new Parser();
    }

    async fetchFeed(feedUrl: string): Promise<FeedItem[]> {
        const feed = await this.parser.parseURL(feedUrl);
        return feed.items.map(item => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            contentSnippet: item.contentSnippet
        }));
    }
}