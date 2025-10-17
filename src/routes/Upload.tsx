import { Link } from 'react-router-dom'

function Upload() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="bg-slate-900 rounded-xl p-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-6">Upload Your Notes</h1>
        <p className="text-lg text-slate-400 mb-8">
          Upload documents to analyze, summarize, and collaborate with your
          team. Login or create an account to unlock AI-powered insights.
        </p>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center">
            <p className="text-slate-400 mb-4">
              Drag and drop files here, or click to browse.
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Select Files
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-400 mb-4">
            To process your uploads, please login or create an account.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/get-started"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
