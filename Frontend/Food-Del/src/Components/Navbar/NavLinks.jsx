import React, {useState} from 'react';
import { Link } from 'react-router-dom';
const navLinks = [
  { name: "Home", id: "home" },
  { name: "Menu", id: "menu" },
  { name: "Mobile-App", id: "mobile-app" },
  { name: "Contact Us", id: "footer" }
];

const NavLinks = () => {
    const [activeLink, setActiveLink] = useState('Home');
    const handleScroll = (id, name) => {
      setActiveLink(name);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  return (
    <ul className="flex list-none gap-[20px] text-[#49557e] text-[18px]  max-[1050px]:gap-[20px] max-[1050px]:text-[17px] 
               max-[900px]:gap-[15px] max-[900px]:text-[16px] 
               max-[750px]:hidden">
      {navLinks.map((link, index) => (
        
        <li key={index} 
        onClick={() => handleScroll(link.id, link.name)}
className={`group cursor-pointer transition-all duration-300 
   ${activeLink === link.name ? "text-red-500 " : "text-[#49557e]"} // Red for active, default color for others
            ${activeLink !== link.name ? "hover:text-[#6e7b8f]" : ""} `}>
         <Link to={`/#${link.id}`}>
          {link.name}
          <div className={`mx-auto h-[1px] transition-all duration-500
              ${activeLink === link.name
                ? "w-0 group-hover:w-full bg-red-500" // Red underline appears on hover for active link
                : "w-0 group-hover:w-full bg-[#9ca3af]"}`}>

                </div>
                </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
