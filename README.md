## Automatify

Automatify is an automation tool that uses Applets to create and consume events.

### Creating Applets

To create an applet, implement the `Applet` interface and define the `trigger` and `action` methods.

Example:
```typescript
// applets/FacebookPostApplet.ts
import { Applet } from './Applet';

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
    // Define event trigger logic
    console.log(`Triggered by event: ${event.type}`);
  }

  action(payload: any): void {
    // Define action logic to post on Facebook
    console.log(`Posting to Facebook with payload: ${JSON.stringify(payload)}`);
  }
}