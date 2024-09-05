import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

console.log("Liveblocks Secret Key:", process.env.LIVEBLOCKS_SECRET_KEY);
