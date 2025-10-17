import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-500 dark:text-slate-400 flex flex-col md:flex-row gap-4 md:justify-between">
        <p>&copy; {new Date().getFullYear()} Noteably. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            to="/privacy"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/support"
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
