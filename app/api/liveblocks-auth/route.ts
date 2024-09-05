import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/sign-in');

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    }
  };

  try {
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: user.info.email,
        groupIds: [],
      },
      { userInfo: user.info }
    );
    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks Authentication Error:", error);
    return new Response("Failed to authenticate with Liveblocks", { status: 500 });
  }
}
