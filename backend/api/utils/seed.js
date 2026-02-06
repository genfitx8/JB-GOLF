import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Location from '../models/Location.js'
import Pro from '../models/Pro.js'
import Booking from '../models/Booking.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jb-golf')
    console.log('✅ MongoDB 연결 성공')

    // Clear existing data
    await User.deleteMany({})
    await Location.deleteMany({})
    await Pro.deleteMany({})
    await Booking.deleteMany({})
    console.log('🗑️  기존 데이터 삭제 완료')

    // Create users
    const customer = await User.create({
      name: '김고객',
      email: 'customer@test.com',
      password: 'Test1234',
      phone: '010-1111-2222',
      role: 'customer',
    })

    const proUser = await User.create({
      name: '박프로',
      email: 'pro@test.com',
      password: 'Test1234',
      phone: '010-3333-4444',
      role: 'pro',
    })

    const storeUser = await User.create({
      name: '이매장',
      email: 'store@test.com',
      password: 'Test1234',
      phone: '010-5555-6666',
      role: 'store',
    })

    console.log('👥 사용자 생성 완료')

    // Create locations
    const location1 = await Location.create({
      name: 'JB 강남 골프 연습장',
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1111-2222',
      totalBays: 20,
      availableBays: 20,
      openingHours: {
        start: '06:00',
        end: '23:00',
      },
      pricePerHour: 30000,
      facilities: ['주차장', '락커룸', '프로샵', '카페', 'Wi-Fi'],
      owner: storeUser._id,
      status: 'active',
    })

    const location2 = await Location.create({
      name: 'JB 역삼 골프 연습장',
      address: '서울시 강남구 역삼동 456',
      phone: '02-3333-4444',
      totalBays: 15,
      availableBays: 15,
      openingHours: {
        start: '07:00',
        end: '22:00',
      },
      pricePerHour: 25000,
      facilities: ['주차장', '락커룸', 'Wi-Fi'],
      owner: storeUser._id,
      status: 'active',
    })

    console.log('🏢 연습장 생성 완료')

    // Create pros
    const pro1 = await Pro.create({
      user: proUser._id,
      bio: '10년 경력의 KPGA 프로입니다. 초보자부터 중급자까지 맞춤 레슨을 제공합니다.',
      specialties: ['드라이버', '아이언', '스윙 교정'],
      experience: 10,
      certifications: [
        {
          name: 'KPGA 프로',
          issuer: 'KPGA',
          year: 2014,
        },
        {
          name: '골프 지도자 1급',
          issuer: '체육회',
          year: 2015,
        },
      ],
      lessonPrice: {
        private: 100000,
        group: 50000,
      },
      location: location1._id,
      availableSlots: [
        { day: 'mon', startTime: '10:00', endTime: '18:00' },
        { day: 'tue', startTime: '10:00', endTime: '18:00' },
        { day: 'wed', startTime: '10:00', endTime: '18:00' },
        { day: 'thu', startTime: '10:00', endTime: '18:00' },
        { day: 'fri', startTime: '10:00', endTime: '18:00' },
      ],
      rating: {
        average: 4.8,
        count: 52,
      },
      status: 'active',
    })

    console.log('👨‍🏫 프로 생성 완료')

    // Create sample bookings
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    await Booking.create({
      user: customer._id,
      location: location1._id,
      date: tomorrow,
      timeSlot: '10:00',
      duration: 60,
      bayNumber: 1,
      type: 'practice',
      status: 'confirmed',
      paymentStatus: 'completed',
      amount: 30000,
    })

    await Booking.create({
      user: customer._id,
      location: location1._id,
      pro: pro1._id,
      date: tomorrow,
      timeSlot: '14:00',
      duration: 60,
      bayNumber: 5,
      type: 'lesson',
      lessonType: 'private',
      status: 'confirmed',
      paymentStatus: 'completed',
      amount: 100000,
    })

    console.log('📅 예약 생성 완료')

    console.log('\n✅ 시드 데이터 생성 완료!')
    console.log('\n📝 테스트 계정:')
    console.log('고객: customer@test.com / Test1234')
    console.log('프로: pro@test.com / Test1234')
    console.log('매장: store@test.com / Test1234')

    process.exit(0)
  } catch (error) {
    console.error('❌ 시드 실패:', error)
    process.exit(1)
  }
}

seedDatabase()
