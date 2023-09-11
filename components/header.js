import Link from "next/link";
import useUser from "../lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import fetchJson from "../lib/fetchJson";

export default function NavBar() {
  const { user, mutateUser } = useUser({
    redirectTo: "",
  });
  const router = useRouter();

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-lime-500 p-5">
        <div className="flex item-center flex-shrink-0 text-slate-100 mr-6">
          <span className="font-semibold text-xl tracking-tight">
            {user?.isLoggedIn === false && (
              <Link href="/">Design Challenge</Link>
            )}
            {user?.isLoggedIn === true && <p>Design Challenge</p>}
          </span>
        </div>
        {user?.isLoggedIn == false && (
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <Link
              href="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-slate-700 hover:text-white mr-4"
            >
              About
            </Link>
          </div>
        )}
        {user?.isLoggedIn === false && (
          <div>
            <Link
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-slate-100 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          </div>
        )}
        {user?.isLoggedIn === true && (
          <p className="text-slate-100">
            Hello!&nbsp;{user.chatHandle}&nbsp;&nbsp;
          </p>
        )}
        {user?.isLoggedIn === true && (
          <div>
            <a
              href="/logout"
              onClick={async (e) => {
                e.preventDefault();
                mutateUser(
                  await fetchJson("/api/logout", { method: "POST" }),
                  false
                );
                router.push("/login");
              }}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-slate-100 border-slate-100 hover:border-transparent hover:text-lime-800 hover:bg-slate-100 mt-4 lg:mt-0"
            >
              Logout
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
