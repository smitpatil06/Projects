// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  async function searchUser(formData: FormData) {
    'use server'; // This is a Next.js Server Action!

    const username = formData.get('username');
    if (username) {
      redirect(`/${username}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">GitHub Profile Viewer</h1>
        <p className="text-center text-gray-400">Enter a GitHub username to see their profile.</p>
        <form action={searchUser} className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g., vercel"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}