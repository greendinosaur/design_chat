import Link from "next/link";

export default function LoginForm(errorMessage, onSubmit) {
  return (
    <div className="w-full max-w-xs justify-center">
      <form
        onSubmit={errorMessage.onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Chat handle
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="chatHandle"
            required
          />
          {errorMessage.errorMessage && (
            <p className="text-red-500 text-xs italic">
              {errorMessage.errorMessage}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Access Chat
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
