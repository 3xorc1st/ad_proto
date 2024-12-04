import { Applet } from './Applet';
import { Event } from './interfaces';
import * as FB from 'fb';
import { readConfig } from '@/lib/configManager';

const config = readConfig();

export class FacebookPostApplet implements Applet {
    id: string;
    name: string;
    description: string;

    constructor() {
        this.id = 'facebook-post-applet';
        this.name = 'Facebook Post Applet';
        this.description = 'Automates posting to Facebook';
    }

    trigger(event: Event): void {
        if (event.type === 'post_to_facebook') {
            console.log(`Triggered by event: ${event.type}`);
            this.action(event.payload);
        } else {
            console.log(`Event type ${event.type} is not supported.`);
        }
    }

    action(payload: any): void {
        console.log(`Posting to Facebook with payload: ${JSON.stringify(payload)}`);

        // Move the logic to validate token and post to Facebook to the server
        fetch('/api/facebook-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: payload.message }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Posted to Facebook successfully! ID:', data.id);
                } else {
                    console.error('Error posting to Facebook:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
    }
}