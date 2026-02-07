import { Routes, Route, Link } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Calendar, Users, DollarSign } from 'lucide-react'

const ProApp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="프로 관리" />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProDashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/students" element={<Students />} />
            <Route path="/earnings" element={<Earnings />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

const ProDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">프로 대시보드</h1>
        <p className="mt-2 text-gray-600">스케줄과 학생을 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/pro/schedule" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">스케줄</h3>
              <p className="text-gray-600">일정 관리</p>
            </div>
          </div>
        </Link>

        <Link to="/pro/students" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">학생 관리</h3>
              <p className="text-gray-600">학생 정보</p>
            </div>
          </div>
        </Link>

        <Link to="/pro/earnings" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">수입 통계</h3>
              <p className="text-gray-600">수익 확인</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const Schedule = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">스케줄 관리</h2>
      <p className="text-gray-600">스케줄 관리 기능이 구현될 예정입니다.</p>
    </div>
  )
}

const Students = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">학생 관리</h2>
      <p className="text-gray-600">학생 관리 기능이 구현될 예정입니다.</p>
    </div>
  )
}

const Earnings = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">수입 통계</h2>
      <p className="text-gray-600">수입 통계 기능이 구현될 예정입니다.</p>
    </div>
  )
}

export default ProApp
