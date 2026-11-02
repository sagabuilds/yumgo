import { auth, currentUser } from "@clerk/nextjs/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const checkUser = async () => {
  try {
    const { userId } = await auth();

    console.log("AUTH USER ID:", userId);

    if (!userId) {
      console.log("❌ No authenticated user");
      return null;
    }

    const user = await currentUser();

    if (!user) {
      console.log("❌ currentUser failed");
      return null;
    }

    console.log("✅ Clerk user found:", user.id);

    return {
      id: 1,
      clerkId: user.id,
      email: user.emailAddresses?.[0]?.emailAddress || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",
      subscriptionTier: "free",
    };
  } catch (error) {
    console.error("CHECKUSER ERROR:", error);
    return null;
  }
};