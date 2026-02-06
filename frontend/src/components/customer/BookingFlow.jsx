import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingService } from '../../services/booking.service'
import { locationService } from '../../services/location.service'
import { proService } from '../../services/pro.service'
import toast from 'react-hot-toast'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

const BookingFlow = () => {
  const [step, setStep] = useState(1)
  const [locations, setLocations] = useState([])
  const [pros, setPros] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    locationId: '',
    proId: '',
    date: '',
    timeSlot: '',
    duration: 60,
    type: 'practice', // practice or lesson
  })
  const navigate = useNavigate()

  useEffect(() => {
    loadLocations()
  }, [])

  const loadLocations = async () => {
    try {
      const data = await locationService.getLocations()
      setLocations(data)
    } catch (error) {
      toast.error('연습장 목록을 불러올 수 없습니다')
    }
  }

  const loadPros = async (locationId) => {
    try {
      const data = await proService.getPros({ locationId })
      setPros(data)
    } catch (error) {
      toast.error('프로 목록을 불러올 수 없습니다')
    }
  }

  const handleLocationSelect = (locationId) => {
    setBookingData({ ...bookingData, locationId })
    if (bookingData.type === 'lesson') {
      loadPros(locationId)
    }
    setStep(2)
  }

  const handleDateSelect = (date) => {
    setBookingData({ ...bookingData, date })
    setStep(3)
  }

  const handleTimeSelect = (timeSlot) => {
    setBookingData({ ...bookingData, timeSlot })
    setStep(4)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await bookingService.createBooking(bookingData)
      toast.success('예약이 완료되었습니다')
      navigate('/customer/my-bookings')
    } catch (error) {
      toast.error(error.response?.data?.message || '예약에 실패했습니다')
    } finally {
      setLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return '연습장 선택'
      case 2:
        return '날짜 선택'
      case 3:
        return '시간 선택'
      case 4:
        return '예약 확인'
      default:
        return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{getStepTitle()}</h1>
        <div className="mt-4 flex items-center space-x-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                s <= step ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              예약 유형
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setBookingData({ ...bookingData, type: 'practice' })}
                className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                  bookingData.type === 'practice'
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                연습장 예약
              </button>
              <button
                onClick={() => setBookingData({ ...bookingData, type: 'lesson' })}
                className={`flex-1 py-3 px-4 rounded-lg border-2 ${
                  bookingData.type === 'lesson'
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                레슨 예약
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <div
                key={location._id}
                onClick={() => handleLocationSelect(location._id)}
                className="card hover:shadow-lg cursor-pointer transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      타석: {location.totalBays}개
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            날짜 선택
          </label>
          <input
            type="date"
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => handleDateSelect(e.target.value)}
          />
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            시간대 선택
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => {
              const timeSlot = `${hour.toString().padStart(2, '0')}:00`
              return (
                <button
                  key={timeSlot}
                  onClick={() => handleTimeSelect(timeSlot)}
                  className="py-3 px-4 rounded-lg border-2 border-gray-300 hover:border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  {timeSlot}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">예약 정보 확인</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">
                  {locations.find(l => l._id === bookingData.locationId)?.name}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{bookingData.date}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{bookingData.timeSlot}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary flex-1"
            >
              이전
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? <LoadingSpinner size="sm" text="" /> : '예약 확정'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingFlow
