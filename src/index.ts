import { RSSService } from './services/RSSService';

const rssService = new RSSService();
rssService.startMonitoring();

// Handle application shutdown
process.on('SIGINT', () => {
    rssService.stopMonitoring();
    process.exit(0);
});