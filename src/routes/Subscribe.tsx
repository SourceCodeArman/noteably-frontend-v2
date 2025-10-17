import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

interface Feature {
  name: string
  free: boolean
  pro: boolean
}

function Subscribe() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showComparison, setShowComparison] = useState(false)

  const features: Feature[] = [
    { name: 'Monthly Uploads', free: true, pro: true },
    { name: 'Basic Summaries', free: true, pro: true },
    { name: 'Premium Summaries', free: false, pro: true },
    { name: 'Priority Processing', free: false, pro: true },
    { name: 'PDF Export', free: false, pro: true },
    { name: 'No Advertisements', free: false, pro: true },
    { name: 'Unlimited Uploads', free: false, pro: true },
  ]

  const handleProUpgrade = () => {
    if (!isAuthenticated) {
      navigate('/get-started')
      return
    }
    // TODO: Integrate Stripe payment flow here
    // Example: redirect to Stripe checkout or open payment modal
    alert('Stripe payment integration coming soon!')
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-slate-400">
          Unlock premium AI-powered summaries, unlimited uploads, and advanced
          features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 hover:border-slate-700 transition-all">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-4xl font-bold mb-4">
            $0<span className="text-lg text-slate-400">/month</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Limited uploads (5 per month)</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Basic summaries</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-slate-400">Ads supported</span>
            </li>
          </ul>
          <Link
            to="/get-started"
            className="block w-full text-center px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
          >
            Get Started Free
          </Link>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg border-2 border-blue-500 relative hover:shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-[1.02]">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-4xl font-bold mb-4">
            $9.99<span className="text-lg text-slate-400">/month</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Unlimited uploads</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Premium summaries</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Priority processing</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>PDF export</span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>No advertisements</span>
            </li>
          </ul>
          <button
            onClick={handleProUpgrade}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
          >
            {isAuthenticated ? 'Upgrade to Pro' : 'Get Started with Pro'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full flex items-center justify-between text-xl font-bold mb-4 hover:text-blue-400 transition-colors"
        >
          <span>Feature Comparison</span>
          <svg
            className={`w-6 h-6 transform transition-transform ${showComparison ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showComparison && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold">Free</th>
                  <th className="text-center py-3 px-4 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">Monthly Uploads</td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    5 uploads
                  </td>
                  <td className="py-3 px-4 text-center text-blue-400">
                    Unlimited
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">Basic Summaries</td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">Premium Summaries</td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-red-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">Priority Processing</td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-red-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">PDF Export</td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-red-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <svg
                      className="w-6 h-6 text-green-500 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4">Advertisements</td>
                  <td className="py-3 px-4 text-center text-slate-400">
                    Yes
                  </td>
                  <td className="py-3 px-4 text-center text-blue-400">
                    None
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Subscribe
