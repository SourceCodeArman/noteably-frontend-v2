import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to Noteably</h1>
        <p className="text-xl text-slate-400 mb-8">
          Your intelligent note-taking companion powered by AI
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/get-started"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
