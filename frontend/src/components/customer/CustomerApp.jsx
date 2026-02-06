import { Routes, Route } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import BookingFlow from './BookingFlow'
import MyBookings from './MyBookings'
import { Calendar, List } from 'lucide-react'
import { Link } from 'react-router-dom'

const CustomerApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="고객 예약" />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<CustomerDashboard />} />
            <Route path="/booking" element={<BookingFlow />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-2 text-gray-600">예약을 생성하고 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/customer/booking"
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">새 예약하기</h3>
              <p className="text-gray-600">연습장 및 레슨 예약</p>
            </div>
          </div>
        </Link>

        <Link
          to="/customer/my-bookings"
          className="card hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <List className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">내 예약 내역</h3>
              <p className="text-gray-600">예약 조회 및 관리</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 안내</h3>
        <ul className="space-y-2 text-gray-600">
          <li>• 연습장 예약은 최소 1일 전까지 가능합니다</li>
          <li>• 레슨 예약은 프로와 협의 후 확정됩니다</li>
          <li>• 예약 취소는 24시간 전까지 무료입니다</li>
          <li>• 문의사항은 고객센터를 이용해주세요</li>
        </ul>
      </div>
    </div>
  )
}

export default CustomerApp
