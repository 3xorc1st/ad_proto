import { Applet } from './Applet';
import { Event, Action } from './interfaces';
import * as FB from 'fb';

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

    action: (payload: any) => void = (payload: any) => {
        console.log(`Posting to Facebook with payload: ${JSON.stringify(payload)}`);

        // Lógica para interactuar con la API de Facebook
        FB.api('me/feed', 'post', {
            message: payload.message,
            access_token: 'EAAPA5zn7VAwBO2TP6UehFweyp4XHO3TnCvBtRm9JFOYNf5W0Hz4EcSEkZCEKUaoIVIFh1ZAX4SbBshnmUOvnM43vki0MNOZCMjm0rhHMaEuyaMMkjGWfGcplT1Y6Iv0F2VuZC6CmEw0f6L3ZAUxh9drS3QcHqYKHX6XmIgiVOdQXF3gYst2wkAGRd8uersMkGEIgP64MyECsI82URghaQknGaCBRmtctPkQZDZD',
        }, (response: any) => {
            if (!response || response.error) {
                console.error('Error posting to Facebook:', response?.error);
            } else {
                console.log('Posted to Facebook successfully! ID:', response.id);
            }
        });
    }
}
