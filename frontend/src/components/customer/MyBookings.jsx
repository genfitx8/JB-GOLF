import { useState, useEffect } from 'react'
import { bookingService } from '../../services/booking.service'
import toast from 'react-hot-toast'
import { Calendar, Clock, MapPin, X } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'
import { formatDate, formatTime } from '../../utils/formatters'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, upcoming, past, cancelled

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const data = await bookingService.getMyBookings()
      setBookings(data)
    } catch (error) {
      toast.error('예약 내역을 불러올 수 없습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('예약을 취소하시겠습니까?')) return

    try {
      await bookingService.cancelBooking(bookingId)
      toast.success('예약이 취소되었습니다')
      loadBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || '예약 취소에 실패했습니다')
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true
    if (filter === 'upcoming') {
      return new Date(booking.date) >= new Date() && booking.status !== 'cancelled'
    }
    if (filter === 'past') {
      return new Date(booking.date) < new Date() && booking.status === 'completed'
    }
    if (filter === 'cancelled') {
      return booking.status === 'cancelled'
    }
    return true
  })

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800',
    }
    const labels = {
      pending: '대기중',
      confirmed: '확정',
      cancelled: '취소됨',
      completed: '완료',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">내 예약 내역</h1>
        <p className="mt-2 text-gray-600">예약을 확인하고 관리하세요</p>
      </div>

      <div className="flex space-x-2">
        {['all', 'upcoming', 'past', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f === 'all' && '전체'}
            {f === 'upcoming' && '예정'}
            {f === 'past' && '지난 예약'}
            {f === 'cancelled' && '취소됨'}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">예약 내역이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.location?.name || '연습장'}
                    </h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{booking.timeSlot}</span>
                    </div>
                    {booking.location?.address && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.location.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                {booking.status === 'confirmed' && new Date(booking.date) >= new Date() && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="예약 취소"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
