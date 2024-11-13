import React, { useState, useEffect } from 'react';
import { RSSFeedIntegration, FeedItem } from '../modules/rssFeedIntegration';

const FeedDisplay: React.FC<{ feedUrl: string }> = ({ feedUrl }) => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

    useEffect(() => {
        const fetchFeed = async () => {
            const rssFeedIntegration = new RSSFeedIntegration();
            const items = await rssFeedIntegration.fetchFeed(feedUrl);
            setFeedItems(items);
        };
        fetchFeed();
    }, [feedUrl]);

    return (
        <div>
            {feedItems.map((item, index) => (
                <div key={index}>
                    <h2>{item.title}</h2>
                    <p>{item.contentSnippet}</p>
                    <a href={item.link}>Read more</a>
                    <p>{item.pubDate}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedDisplay;