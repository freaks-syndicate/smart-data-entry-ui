'use client';
import { SettingTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Icon, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Skeleton, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import { client } from '@/apollo/client.mjs';
import { GET_USER_INFO } from '@/queries/user/get-user-info';
import { User, UserQuery, UserQueryVariables } from '@/utils/types/generated/graphql';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const session = useSessionContext();
  const router = useRouter();

  let userId: string | null = null;

  // TODO: Validate if this code is causing any auth related issues
  // useEffect(() => {
  //   if (!session.loading && 'doesSessionExist' in session && !session.doesSessionExist) {
  //     console.log('[+] Redirecting to auth');
  //     router.push('/auth');
  //   }
  // }, [session, router]);

  if (!session.loading) {
    userId = session.userId;
  }

  useEffect(() => {
    const getUserInfo = async () => {
      if (!session.loading && userId) {
        const { data } = await client.query<UserQuery, UserQueryVariables>({
          query: GET_USER_INFO,
          variables: { where: { userId: userId } },
        });
        if (data?.user) {
          setUserInfo(data.user);
        }
      }
    };

    getUserInfo();
  }, [session.loading, userId]);

  async function onLogout() {
    await signOut();
    router.push('/auth');
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex items-center justify-between mx-auto p-4">
          {/* Brand Name & Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative w-8 h-8">
              <Image src="/sde-logo.png" alt="donation logo" width={32} height={32} />
            </div>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Smart Data Entry</span>
          </Link>
          {/* Toggle Menu Button */}
          <div className="flex md:hidden space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          {/* Nav Links */}
          <div className={`items-center justify-between ${isMenuOpen ? 'flex' : 'hidden'} md:flex`} id="navbar-sticky">
            <ul className="flex flex-col p-4 w-full md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/export"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Export
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Auth Section */}
          <div className="flex gap-2">
            <Skeleton isLoaded={!session.loading}>
              <Menu>
                <MenuButton as={Button}>
                  <div className="flex items-center justify-center gap-2">
                    <Text>Profile</Text>
                    <Avatar size={'sm'} name={userInfo?.firstName ?? ''} />
                  </div>
                </MenuButton>
                <MenuList bgColor={'InfoBackground'}>
                  <MenuGroup title={`${userInfo?.firstName} ${userInfo?.lastName}`}>
                    <MenuItem icon={<Icon as={UserOutlined} />}>My Account</MenuItem>
                    <MenuItem icon={<Icon as={SettingTwoTone} />}>Settings </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem icon={<Icon as={FaSignOutAlt} />} onClick={onLogout} color={'crimson'}>
                      Sign Out
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
