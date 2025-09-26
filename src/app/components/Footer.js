import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#1c252e] text-gray-300 py-2">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-center">
        
        {/* Logo Section */}
        <div className="justify-center md:justify-start">
          <Image
            src="/images/logo2.png"
            alt="Lakshmi Iron Company Logo"
            width={140}
            height={40}
            className="h-7 w-auto"
          />
          <p className="mt-2 text-left text-sm text-gray-500"> © {new Date().getFullYear()} Lakshmi Iron Company. All rights reserved. </p>
       
        
        </div>
         

        {/* Contact Info Section */}
        <div className="text-center space-y-2">
         {/* <p>📧 info@ironbusiness.com</p>*/}
          <p>📞 +91 79732 41912 | +91 77176 86970</p>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center md:justify-end space-x-4">
          <p>Shop No. 223, Sector - 29D,<br />
          Iron Market, Chandigarh</p>
        {/* Facebook */}
        <a href="https://www.facebook.com/profile.php?id=61575197713560" target="_blank" aria-label="Facebook" className="hover:text-white transition">
          <svg
            className="h-6 w-6"
            fill="#c4763d"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.772-1.63 1.562v1.88h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        </a>

        {/* Twitter 
        <a href="#" aria-label="Twitter" className="hover:text-white transition">
          <svg
            className="h-6 w-6"
            fill="#c4763d"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 0 0 1.88-2.35 8.56 8.56 0 0 1-2.7 1.03 4.25 4.25 0 0 0-7.24 3.87A12.07 12.07 0 0 1 3.15 4.64a4.25 4.25 0 0 0 1.32 5.68 4.22 4.22 0 0 1-1.92-.53v.05a4.25 4.25 0 0 0 3.41 4.17 4.26 4.26 0 0 1-1.91.07 4.25 4.25 0 0 0 3.97 2.95A8.52 8.52 0 0 1 2 18.57a12.03 12.03 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 5.54a8.46 8.46 0 0 1-2.54.7 4.23 4.23 0 0 0 1.86-2.34z"/>
          </svg>
        </a>

        {/* Instagram 
        <a href="#" aria-label="Instagram" className="hover:text-white transition">
          <svg
            className="h-6 w-6"
            fill="#c4763d"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.415a4.92 4.92 0 0 1 1.79 1.162 4.92 4.92 0 0 1 1.162 1.79c.175.46.361 1.26.415 2.43.058 1.265.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.415 2.43a4.92 4.92 0 0 1-1.162 1.79 4.92 4.92 0 0 1-1.79 1.162c-.46.175-1.26.361-2.43.415-1.265.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.415a4.92 4.92 0 0 1-1.79-1.162 4.92 4.92 0 0 1-1.162-1.79c-.175-.46-.361-1.26-.415-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.415-2.43a4.92 4.92 0 0 1 1.162-1.79A4.92 4.92 0 0 1 5.58 2.685c.46-.175 1.26-.361 2.43-.415C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.735 0 8.332.014 7.052.072 5.775.13 4.84.313 4.052.638a7.075 7.075 0 0 0-2.58 1.677A7.075 7.075 0 0 0 .638 4.895c-.325.788-.508 1.723-.566 3C.014 8.332 0 8.735 0 12c0 3.265.014 3.668.072 4.948.058 1.277.241 2.212.566 3a7.075 7.075 0 0 0 1.677 2.58 7.075 7.075 0 0 0 2.58 1.677c.788.325 1.723.508 3 .566C8.332 23.986 8.735 24 12 24s3.668-.014 4.948-.072c1.277-.058 2.212-.241 3-.566a7.075 7.075 0 0 0 2.58-1.677 7.075 7.075 0 0 0 1.677-2.58c.325-.788.508-1.723.566-3 .058-1.28.072-1.683.072-4.948s-.014-3.668-.072-4.948c-.058-1.277-.241-2.212-.566-3a7.075 7.075 0 0 0-1.677-2.58A7.075 7.075 0 0 0 19.948.638c-.788-.325-1.723-.508-3-.566C15.668.014 15.265 0 12 0zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
          </svg>
        </a>*/}
      </div>

      </div>

      {/* Copyright Section */}
     
    </footer>
  );
}
