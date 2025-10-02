// app/[username]/page.tsx
import Image from 'next/image';
import { FaUsers, FaStar, FaCodeBranch, FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';

// Define types for our data for TypeScript
type User = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
};

type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

// This is a Server Component, so we can make it async
export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const { username } = params;

  // Fetch user data and repos in parallel
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    })
  ]);

  if (!userRes.ok) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">User not found!</div>;
  }

  const user: User = await userRes.json();
  const repos: Repo[] = await reposRes.json();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* User Profile Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full border-4 border-gray-600"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-xl text-gray-400">@{user.login}</p>
            <p className="mt-2 text-gray-300">{user.bio}</p>
            <div className="mt-4 flex justify-center sm:justify-start items-center space-x-4 text-gray-400">
              <span className="flex items-center"><FaUsers className="mr-1" /> {user.followers} followers</span>
              <span>·</span>
              <span className="flex items-center">{user.following} following</span>
            </div>
             <div className="mt-2 flex items-center justify-center sm:justify-start text-gray-400">
                <FaCalendarAlt className="mr-2" />
                Joined {format(new Date(user.created_at), "MMMM d, yyyy")}
            </div>
          </div>
        </div>

        {/* Repositories List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Latest Repositories</h2>
          <div className="space-y-4">
            {repos.map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                  <h3 className="text-xl font-semibold text-blue-400">{repo.name}</h3>
                  <p className="text-gray-400 mt-1">{repo.description}</p>
                  <div className="mt-3 flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center"><FaStar className="mr-1" /> {repo.stargazers_count}</span>
                    <span className="flex items-center"><FaCodeBranch className="mr-1" /> {repo.forks_count}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}