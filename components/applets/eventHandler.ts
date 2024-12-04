import { FacebookPostApplet } from "@/components/applets/FacebookPostApplet";

const facebookPostApplet = new FacebookPostApplet();

export function handleEvent(event: any): void {
    if (event.type === "specificCondition") {
        facebookPostApplet.trigger(event);
    }
}