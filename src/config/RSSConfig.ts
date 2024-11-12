import { RSSFeedConfig } from "../interfaces/RSSFedd";

export const RSS_CONFIG: RSSFeedConfig[] = [
    {
        url: "https://example.com/feed.xml",
        categories: ["technology", "business"],
        keywords: ["typescript", "javascript"]
    }
    // Add more feeds as needed
];

export const RSS_UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds