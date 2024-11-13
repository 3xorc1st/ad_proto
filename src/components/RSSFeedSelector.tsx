import React, { useState, useEffect } from 'react';
import { RSSFeedIntegration, FeedItem } from '../modules/rssFeedIntegration';

const RSSFeedSelector: React.FC<{ feedUrl: string, onSelect: (item: FeedItem) => void }> = ({ feedUrl, onSelect }) => {
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
      <h3>Select Content from RSS Feed</h3>
      <ul>
        {feedItems.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSSFeedSelector;