'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { SuperTokensWrapper } from 'supertokens-auth-react';
import SuperTokensReact from 'supertokens-auth-react';

import { frontendConfig, setRouter } from '@/app/config/frontend';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

export const SupertokensProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
