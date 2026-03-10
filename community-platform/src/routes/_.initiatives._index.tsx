import { generateTags, mergeMeta } from 'src/utils/seo.utils';
import BrowseInitiatives from 'src/pages/Initiatives/BrowseInitiatives';

export async function loader() {
  return null;
}

export const meta = mergeMeta(() => {
  return generateTags(`Initiatives - ${import.meta.env.VITE_SITE_NAME}`);
});

export default function InitiativesIndex() {
  return <BrowseInitiatives />;
}
