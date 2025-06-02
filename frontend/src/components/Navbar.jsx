// import React, { useState } from 'react';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-blue-600 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 font-bold text-xl">
//             MonLogo
//           </div>

//           {/* Menu desktop */}
//           <div className="hidden md:flex space-x-8">
//             <a href="#home" className="hover:bg-blue-700 px-3 py-2 rounded">
//               Accueil
//             </a>
//             <a href="#about" className="hover:bg-blue-700 px-3 py-2 rounded">
//               À propos
//             </a>
//             <a href="#services" className="hover:bg-blue-700 px-3 py-2 rounded">
//               Services
//             </a>
//             <a href="#contact" className="hover:bg-blue-700 px-3 py-2 rounded">
//               Contact
//             </a>
//           </div>

//           {/* Bouton menu mobile */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="focus:outline-none focus:ring-2 focus:ring-white"
//               aria-label="Toggle menu"
//             >
//               {/* Icone hamburger */}
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Menu mobile déroulant */}
//       {isOpen && (
//         <div className="md:hidden bg-blue-700 px-2 pt-2 pb-3 space-y-1">
//           <a
//             href="#home"
//             className="block px-3 py-2 rounded hover:bg-blue-800"
//             onClick={() => setIsOpen(false)}
//           >
//             Accueil
//           </a>
//           <a
//             href="#about"
//             className="block px-3 py-2 rounded hover:bg-blue-800"
//             onClick={() => setIsOpen(false)}
//           >
//             À propos
//           </a>
//           <a
//             href="#services"
//             className="block px-3 py-2 rounded hover:bg-blue-800"
//             onClick={() => setIsOpen(false)}
//           >
//             Services
//           </a>
//           <a
//             href="#contact"
//             className="block px-3 py-2 rounded hover:bg-blue-800"
//             onClick={() => setIsOpen(false)}
//           >
//             Contact
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
