function Subscribe() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-slate-400">
          Unlock the full power of AI-enhanced note-taking
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-4xl font-bold mb-4">
            $0<span className="text-lg text-slate-400">/month</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Up to 50 notes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Basic organization</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Web access</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            Get Started
          </button>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg border-2 border-blue-500 relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 px-4 py-1 rounded-full text-sm">
            Popular
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-4xl font-bold mb-4">
            $9<span className="text-lg text-slate-400">/month</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Unlimited notes</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>AI-powered search</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Advanced organization</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Priority support</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade to Pro
          </button>
        </div>

        <div className="bg-slate-900 p-8 rounded-lg border border-slate-800">
          <h3 className="text-2xl font-bold mb-2">Team</h3>
          <p className="text-4xl font-bold mb-4">
            $29<span className="text-lg text-slate-400">/month</span>
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Up to 10 team members</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Shared workspaces</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Admin controls</span>
            </li>
          </ul>
          <button className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
