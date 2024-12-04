// applets/FacebookPostApplet.ts
import { Applet } from './Applet';
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

    trigger(event: any): void {
        if (event.type === 'button_click' && event.target.id === 'post-to-facebook') {
            this.action({ message: 'Hello, world!' });
        }
    }

    action(payload: any): void {
        FB.api('me/feed', 'post', {
            message: payload.message,
            access_token: 'EAAPA5zn7VAwBO4BYJ5YNkkANTjJeVsTOjfZCBTlFIgWulVl6wHGHfSOc9yzFJKXV3FGRzr0geiyqvwhhYc4l4w1nDRpvuR3fhUitWh427u7IbxyD19rzHBbrATkeqb37X3SSwljCuAeqhCZB9ozkg3kGhqsBb3QJ2HkCDO7350GqiE6zEbYVv0WaDR394mhuLCdoLRA6eWZB8z7F597tSecRxdFElFiz0oS6I7BvVT4x96kJ1c2kAQ2076I7lCXsgZDZD',
        }, (response: any) => {
            if (!response || response.error) {
                console.error('Error posting to Facebook:', response?.error);
            } else {
                console.log('Posted to Facebook successfully! ID:', response.id);
            }
        });
    }
}