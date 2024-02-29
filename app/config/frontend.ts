import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import SessionReact from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import { appInfo } from './app-info';

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

// Learn more: https://supertokens.com/docs/thirdpartyemailpassword/nextjs/app-directory/init
export const frontendConfig = (): SuperTokensConfig => ({
  appInfo,
  recipeList: [
    ThirdPartyEmailPasswordReact.init({
      signInAndUpFeature: {
        providers: [
          ThirdPartyEmailPasswordReact.Google.init(),
          ThirdPartyEmailPasswordReact.Github.init(),
          ThirdPartyEmailPasswordReact.Apple.init(),
        ],
      },
    }),
    SessionReact.init(),
  ],
  windowHandler: (original) => ({
    ...original,
    location: {
      ...original.location,
      getPathName: () => routerInfo.pathName!,
      assign: (url) => routerInfo.router!.push(url.toString()),
      setHref: (url) => routerInfo.router!.push(url.toString()),
    },
  }),
});
