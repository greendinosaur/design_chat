import Link from "next/link";
import useUser from "../lib/useUser";
import Router from "next/router";

function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}

export default function HomePage() {
  const { user, mutateUser } = useUser({
    redirectTo: "/chatting",
    redirectIfFound: true,
  });

  function loginButton() {
    return (
      <Link
        href="/login"
        className="inline-block text-sm  bg-lime-500 px-4 py-2 leading-none border rounded text-slate-800 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex justify-center">
      {!user && loginButton()}
      {user?.isLoggedIn === false && loginButton()}
    </div>
  );
}
