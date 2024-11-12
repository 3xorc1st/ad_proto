export interface RSSFeedConfig {
    url: string;
    categories: string[];
    keywords: string[];
}

export interface RSSItem {
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
    pubDate: Date;
    categories: string[];
}