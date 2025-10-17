function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-semibold mb-2">Total Notes</h3>
          <p className="text-3xl font-bold">42</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-semibold mb-2">Notes This Week</h3>
          <p className="text-3xl font-bold">8</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
        <div className="space-y-4">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-semibold mb-1">Meeting Notes - Q4 Planning</h3>
            <p className="text-sm text-slate-400">Updated 2 hours ago</p>
          </div>
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-semibold mb-1">Product Ideas</h3>
            <p className="text-sm text-slate-400">Updated yesterday</p>
          </div>
          <div className="pb-4">
            <h3 className="font-semibold mb-1">Research Notes</h3>
            <p className="text-sm text-slate-400">Updated 3 days ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
