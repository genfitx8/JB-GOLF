import { Routes, Route, Link } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { LayoutDashboard, CalendarCheck, Activity } from 'lucide-react'

const StoreApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="매장 관리" />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<StoreDashboard />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/bay-status" element={<BayStatus />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

const StoreDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">매장 대시보드</h1>
        <p className="mt-2 text-gray-600">매장 운영을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/store/bookings" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <CalendarCheck className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">예약 관리</h3>
              <p className="text-gray-600">예약 현황</p>
            </div>
          </div>
        </Link>

        <Link to="/store/bay-status" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">타석 현황</h3>
              <p className="text-gray-600">실시간 현황</p>
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <LayoutDashboard className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">매출 통계</h3>
              <p className="text-gray-600">수익 분석</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BookingManagement = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">예약 관리</h2>
      <p className="text-gray-600">예약 관리 기능이 구현될 예정입니다.</p>
    </div>
  )
}

const BayStatus = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">타석 현황</h2>
      <p className="text-gray-600">타석 현황 기능이 구현될 예정입니다.</p>
    </div>
  )
}

export default StoreApp
