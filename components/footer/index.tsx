import Image from "next/image";
import React from "react";

const Footer = () => {
  // TODO: Remove side margin
  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-900 mt-4 border-t-[1px] border-gray-200">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="https://e7.pngegg.com/pngimages/650/731/png-clipart-invoice-computer-icons-business-service-receipt-receipt-angle-text-thumbnail.png"
              width={32} // Specify the width
              height={32} // And the height of the image
              alt="donation logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Donation
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Donation™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
