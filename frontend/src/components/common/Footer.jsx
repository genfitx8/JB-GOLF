const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              © 2024 JB-GOLF. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
              이용약관
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
              개인정보처리방침
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-600">
              고객센터
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
