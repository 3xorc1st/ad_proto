## Automatify

Automatify is an automation tool that uses Applets to create and consume events.

### Creating Applets

To create an applet, implement the `Applet` interface and define the `trigger` and `action` methods.

### Common Interfaces

We use common interfaces for events and actions to ensure consistency and extendability.

#### Event Interface

```typescript
export interface Event {
    type: string;
    payload: any;
}