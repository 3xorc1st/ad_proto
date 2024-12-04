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

        FB.api('me/feed', 'post', {
            message: payload.message,
            access_token: config.facebook.access_token
        }, (response: any) => {
            if (!response || response.error) {
                console.error('Error posting to Facebook:', response?.error);
            } else {
                console.log('Posted to Facebook successfully! ID:', response.id);
            }
        });
    }
}