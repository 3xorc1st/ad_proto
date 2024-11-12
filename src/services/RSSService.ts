import { RSSFeedManager } from './RSSFeedManager';
import { RSS_CONFIG, RSS_UPDATE_INTERVAL } from '../config/RSSConfig';
import { RSSItem } from '../interfaces/RSSFedd';

export class RSSService {
    private feedManager: RSSFeedManager;
    private updateInterval!: NodeJS.Timeout;

    constructor() {
        this.feedManager = new RSSFeedManager();
        this.initializeFeeds();
    }

    private initializeFeeds(): void {
        RSS_CONFIG.forEach(feed => {
            this.feedManager.addFeed(feed);
        });
    }

    public startMonitoring(): void {
        // Initial check
        this.checkForNewContent();

        // Set up periodic checking
        this.updateInterval = setInterval(() => {
            this.checkForNewContent();
        }, RSS_UPDATE_INTERVAL);
    }

    public stopMonitoring(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    private async checkForNewContent(): Promise<void> {
        try {
            const newContent = await this.feedManager.getNewContent();
            
            newContent.forEach((items, feedUrl) => {
                this.processNewItems(items, feedUrl);
            });
        } catch (error) {
            console.error('Error checking for new content:', error);
        }
    }

    private processNewItems(items: RSSItem[], feedUrl: string): void {
        // Here you would implement the logic to store items for Facebook posting
        items.forEach(item => {
            console.log(`New item from ${feedUrl}:`, item.title);
            // TODO: Add to temporary storage/queue for Facebook posting
        });
    }
}