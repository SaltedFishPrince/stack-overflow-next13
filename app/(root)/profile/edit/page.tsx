import Profile from "./components/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";

const Page = async ({ params }: ParamsProps) => {
  const userId = process.env.NEXT_PUBLIC_USER_ID
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Profile</h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;
