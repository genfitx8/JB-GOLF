import { createContext, useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'

const NotificationContext = createContext(null)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    const newSocket = io(socketUrl, {
      autoConnect: false,
    })

    const token = localStorage.getItem('token')
    if (token) {
      newSocket.auth = { token }
      newSocket.connect()
    }

    newSocket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev])
      toast.success(notification.message)
    })

    newSocket.on('booking:created', (booking) => {
      toast.success('새로운 예약이 생성되었습니다')
    })

    newSocket.on('booking:updated', (booking) => {
      toast.info('예약이 업데이트되었습니다')
    })

    newSocket.on('booking:cancelled', (booking) => {
      toast.error('예약이 취소되었습니다')
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  const sendNotification = (message, type = 'info') => {
    toast[type](message)
  }

  const value = {
    socket,
    notifications,
    sendNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
