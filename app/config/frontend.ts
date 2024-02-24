import { useRouter } from 'next/navigation';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import Session from 'supertokens-auth-react/recipe/session';
import ThirdPartyEmailPassword, { Apple, Github, Google } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';

import { appInfo } from './app-info';

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } = {};

export function setRouter(router: ReturnType<typeof useRouter>, pathName: string) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => ({
  appInfo,
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [Google.init(), Github.init(), Apple.init()],
      },
    }),
    Session.init(),
  ],
  windowHandler: (orig) => ({
    ...orig,
    location: {
      ...orig.location,
      getPathName: () => routerInfo.pathName!,
      assign: (url) => routerInfo.router!.push(url.toString()),
      setHref: (url) => routerInfo.router!.push(url.toString()),
    },
  }),
});
