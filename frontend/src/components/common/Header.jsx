import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut, User } from 'lucide-react'

const Header = ({ title }) => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to={`/${user?.role}`} className="text-2xl font-bold text-primary-600">
              JB-GOLF
            </Link>
            {title && (
              <span className="ml-4 text-xl font-semibold text-gray-700">
                {title}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-700">
                {user?.name || user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
