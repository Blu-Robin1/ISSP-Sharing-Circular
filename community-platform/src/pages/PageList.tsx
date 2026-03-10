import { MODULE } from 'src/modules';

interface IPageNavigation {
  module: MODULE;
  path: string;
  title: string;
}

const discover: IPageNavigation = {
  module: MODULE.HOWTO,
  path: '/library',
  title: 'Discover',
};

const about: IPageNavigation = {
  module: MODULE.CORE,
  path: '/about',
  title: 'About',
};

const howItWorks: IPageNavigation = {
  module: MODULE.CORE,
  path: '/how-it-works',
  title: 'How It Works',
};

const impact: IPageNavigation = {
  module: MODULE.CORE,
  path: '/impact',
  title: 'Impact',
};

const settings: IPageNavigation = {
  module: MODULE.CORE,
  path: '/settings',
  title: 'Settings',
};

const maps: IPageNavigation = {
  module: MODULE.CORE,
  path: '/map',
  title: 'Map',
};

export const getAvailablePageList = (supportedModules: MODULE[]): IPageNavigation[] => {
  return COMMUNITY_PAGES.filter((pageItem) => supportedModules.includes(pageItem.module));
};

export const COMMUNITY_PAGES: IPageNavigation[] = [
  discover,
  maps,
  about,
  howItWorks,
  impact,
];

/** Additional pages to show in signed-in profile dropdown */
export const COMMUNITY_PAGES_PROFILE: IPageNavigation[] = [settings];


// import { MODULE } from 'src/modules';

// interface IPageNavigation {
//   module: MODULE;
//   path: string;
//   title: string;
// }

// const QuestionModule: IPageNavigation = {
//   module: MODULE.QUESTION,
//   path: '/questions',
//   title: 'Questions',
// };

// const ResearchModule: IPageNavigation = {
//   module: MODULE.RESEARCH,
//   path: '/research',
//   title: 'Research',
// };

// const library: IPageNavigation = {
//   module: MODULE.HOWTO,
//   path: '/library',
//   title: 'Library',
// };
// const settings: IPageNavigation = {
//   module: MODULE.CORE,
//   path: '/settings',
//   title: 'Settings',
// };
// const academy: IPageNavigation = {
//   module: MODULE.ACADEMY,
//   path: '/academy',
//   title: 'Academy',
// };

// const news: IPageNavigation = {
//   module: MODULE.NEWS,
//   path: '/news',
//   title: 'News',
// };

// export const getAvailablePageList = (supportedModules: MODULE[]): IPageNavigation[] => {
//   return COMMUNITY_PAGES.filter((pageItem) => supportedModules.includes(pageItem.module));
// };

// export const COMMUNITY_PAGES: IPageNavigation[] = [
//   news,
//   library,
//   maps,
//   academy,
//   ResearchModule,
//   QuestionModule,
// ];

// /** Additional pages to show in signed-in profile dropdown */
// export const COMMUNITY_PAGES_PROFILE: IPageNavigation[] = [settings];
