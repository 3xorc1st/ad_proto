import React, { useState } from 'react';
import RSSFeedSelector from './RSSFeedSelector';
import PostEditor from './PostEditor';
import SchedulePost from './SchedulePost';
import { FeedItem } from '../modules/rssFeedIntegration';

const PublicationManager: React.FC = () => {
    const [selectedContent, setSelectedContent] = useState<string>('');
    const [customContent, setCustomContent] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

    const handleSelectContent = (item: FeedItem) => {
        setSelectedContent(item?.contentSnippet ?? '');
    };

    const handleContentChange = (content: string) => {
        setCustomContent(content);
    };

    const handleSchedule = (date: Date) => {
        setScheduledDate(date);
    };

    const handleSubmit = () => {
        // Logic to handle post submission
    };

    return (
        <div>
            <h2>Create and Schedule Publication</h2>
            <RSSFeedSelector feedUrl="https://example.com/rss" onSelect={handleSelectContent} />
            <PostEditor content={customContent || selectedContent} onChange={handleContentChange} />
            <SchedulePost onSchedule={handleSchedule} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default PublicationManager;