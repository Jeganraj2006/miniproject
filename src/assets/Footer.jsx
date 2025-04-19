import React from 'react'

const Footer = () => {
  const year=new Date().getFullYear();

  return (
    <div>
        <footer className="mt-10 bg-green-600 text-white p-4 text-center w-full bottom-0 mt-auto">
        <p>&copy;{year} Agrilink. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Footer