import { ClientOnly } from 'node_modules/remix-utils/build/react/client-only';
import Main from 'src/pages/common/Layout/Main';
import MapsPage from 'src/pages/Maps/Maps.client';
import { MapPinServiceContext, mapPinService } from 'src/pages/Maps/map.service';
import { generateTags, mergeMeta } from 'src/utils/seo.utils';
import { Box } from 'theme-ui'
import '../styles/leaflet.css';

export async function loader() {
  return null;
}

export const meta = mergeMeta(() => {
  return generateTags(`Map - ${import.meta.env.VITE_SITE_NAME}`);
});

export default function Index() {
  return (
    <Main ignoreMaxWidth={true}>
      <Box sx={{ mt: [10, 12] }}>
        <MapPinServiceContext.Provider value={mapPinService}>
          <ClientOnly fallback={<></>}>{() => <MapsPage />}</ClientOnly>
        </MapPinServiceContext.Provider>
      </Box>
    </Main>
  );
}
