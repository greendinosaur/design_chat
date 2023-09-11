import useUser from "../lib/useUser";
import { MyChatBotComponent } from "../components/MyChatBotComponent";

import { useRouter } from "next/router";

export default function chatting() {
  const { user, mutateUser } = useUser({
    redirectTo: "",
  });
  const router = useRouter();

  return (
    <div className="container mx-auto p-5">
      {user?.isLoggedIn === true && <MyChatBotComponent />}
      {!user?.isLoggedIn && <p>User not logged in</p>}
    </div>
  );
}
