## Automatify

Automatify is an automation tool that uses Applets to create and consume events.

### Creating Applets

To create an applet, implement the `Applet` interface and define the `trigger` and `action` methods.

Example:
```typescript
import { Applet } from './Applet';
import { Event } from './interfaces';

export class SampleApplet implements Applet {
    id: string;
    name: string;
    description: string;

    constructor() {
        this.id = 'sample-applet';
        this.name = 'Sample Applet';
        this.description = 'A sample applet for demonstration purposes';
    }

    trigger(event: Event): void {
        if (event.type === 'sample_event') {
            console.log(`Triggered by event: ${event.type}`);
            this.action(event.payload);
        } else {
            console.log(`Event type ${event.type} is not supported.`);
        }
    }

    action(payload: any): void {
        console.log(`Action executed with payload: ${JSON.stringify(payload)}`);
    }
}