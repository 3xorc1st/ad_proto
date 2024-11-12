import Parser from 'rss-parser';
import NodeCache from 'node-cache';
import { RSSFeedConfig, RSSItem } from '../interfaces/RSSFedd';

export class RSSFeedManager {
    private parser: Parser;
    private cache: NodeCache;
    private feeds: RSSFeedConfig[];

    constructor() {
        this.parser = new Parser({
            customFields: {
                item: ['media:content', 'enclosure']
            }
        });
        this.cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour
        this.feeds = [];
    }

    public addFeed(feed: RSSFeedConfig): void {
        this.feeds.push(feed);
    }

    public removeFeed(url: string): void {
        this.feeds = this.feeds.filter(feed => feed.url !== url);
    }

    private async fetchFeed(feedConfig: RSSFeedConfig): Promise<RSSItem[]> {
        try {
            const feed = await this.parser.parseURL(feedConfig.url);
            return feed.items.map(item => ({
                title: item.title || '',
                description: item.description || '',
                link: item.link || '',
                imageUrl: this.extractImage(item),
                pubDate: new Date(item.pubDate || Date.now()),
                categories: item.categories || []
            }));
        } catch (error) {
            console.error(`Error fetching feed ${feedConfig.url}:`, error);
            return [];
        }
    }

    private extractImage(item: any): string | undefined {
        if (item['media:content']) {
            return item['media:content'].$.url;
        }
        if (item.enclosure && item.enclosure.url) {
            return item.enclosure.url;
        }
        return undefined;
    }

    private filterContent(item: RSSItem, feedConfig: RSSFeedConfig): boolean {
        // Check if item matches any category
        const categoryMatch = feedConfig.categories.length === 0 || 
            item.categories.some(cat => 
                feedConfig.categories.some(configCat => 
                    cat.toLowerCase().includes(configCat.toLowerCase())
                )
            );

        // Check if item matches any keyword
        const keywordMatch = feedConfig.keywords.length === 0 ||
            feedConfig.keywords.some(keyword =>
                item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                item.description.toLowerCase().includes(keyword.toLowerCase())
            );

        return categoryMatch && keywordMatch;
    }

    public async getNewContent(): Promise<Map<string, RSSItem[]>> {
        const newContent = new Map<string, RSSItem[]>();

        for (const feed of this.feeds) {
            const items = await this.fetchFeed(feed);
            const filteredItems = items
                .filter(item => this.filterContent(item, feed))
                .filter(item => !this.cache.get(item.link)); // Only get new items

            if (filteredItems.length > 0) {
                newContent.set(feed.url, filteredItems);
                // Cache new items
                filteredItems.forEach(item => {
                    this.cache.set(item.link, true);
                });
            }
        }

        return newContent;
    }
}