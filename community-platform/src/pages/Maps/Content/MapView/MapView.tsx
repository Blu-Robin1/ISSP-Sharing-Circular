import type { LatLngExpression } from 'leaflet';
// biome-ignore lint/suspicious/noShadowRestrictedNames: this is an external library import
import { Button, Map } from 'oa-components';
import { useContext, useEffect, useRef, useState } from 'react';
import type { Map as MapType } from 'react-leaflet';
import { Box, Flex, Text } from 'theme-ui';
import { MapContext } from '../../MapContext';
import { ButtonZoomIn } from './ButtonZoomIn.client';
import { Clusters } from './Cluster.client';
import { InitiativeDrawer } from './InitiativeDrawer';
import { InitiativeSubmissionForm } from './InitiativeSubmissionForm';
import { Popup } from './Popup.client';

export const MapView = () => {
  const mapState = useContext(MapContext);
  const mapRef = useRef<MapType>(null);
  const clusterGroupRef = useRef<any>(null);

  const [isViewportGreaterThanTablet, setIsViewportGreaterThanTablet] = useState(true);
  const [pendingInitiativePlacement, setPendingInitiativePlacement] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const update = () => setIsViewportGreaterThanTablet(window.innerWidth > 1024);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (mapRef.current && mapState) {
      mapState.setMapRef(mapRef.current);
    }
  }, [mapRef.current, mapState]);

  useEffect(() => {
    if (clusterGroupRef.current && mapState) {
      mapState.setClusterGroupRef(clusterGroupRef.current);
    }
  }, [clusterGroupRef.current, mapState]);

  if (!mapState) {
    return null;
  }

  const handleLocationChange = () => {
    // Works on older react-leaflet versions that expose leafletElement
    if (mapRef.current?.leafletElement) {
      mapState.setBoundaries(mapRef.current.leafletElement.getBounds());
      return;
    }
    // Works on newer react-leaflet versions
    if ((mapRef.current as any)?.getBounds) {
      mapState.setBoundaries((mapRef.current as any).getBounds());
    }
  };

  const isInitiative = (pin: any) => {
    const stage = pin?.stage ?? pin?.scis?.stage;
    return pin?.type === 'initiative' || Number.isFinite(stage);
  };

  const handleMapClick = (e: { latlng: { lat: number; lng: number } }) => {
    if (mapState.isPlacingProject) {
      setPendingInitiativePlacement({ lat: e.latlng.lat, lng: e.latlng.lng });
      mapState.setIsPlacingProject(false);
    } else {
      mapState.selectPin(null);
    }
  };

  const mapCenter: LatLngExpression = mapState.location
    ? [mapState.location.lat, mapState.location.lng]
    : [0, 0];

  return (
    <Map
      ref={mapRef}
      className="markercluster-map"
      center={mapCenter}
      zoom={mapState.zoom}
      setZoom={mapState.setZoom}
      maxZoom={18}
      style={{ flex: 1, backgroundColor: '#AAD3DF' }}
      zoomControl={isViewportGreaterThanTablet}
      onclick={handleMapClick}
      ondragend={handleLocationChange}
      onzoomend={handleLocationChange}
      onresize={isViewportGreaterThanTablet ? handleLocationChange : undefined}
      useFlyTo
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 4,
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <ButtonZoomIn
          setCenter={(value) => mapState.setLocation(value)}
          setZoom={mapState.setZoom}
        />
        {mapState.isPlacingProject && (
          <Text sx={{ fontSize: 0, color: 'primary', bg: 'white', p: 2, borderRadius: 2 }}>
            Click on the map to place your project
          </Text>
        )}
        <Button
          data-cy="SubmitInitiativeButton"
          variant={mapState.isPlacingProject ? 'primary' : 'outline'}
          onClick={() => mapState.setIsPlacingProject(!mapState.isPlacingProject)}
          small
        >
          {mapState.isPlacingProject ? 'Cancel placement' : 'Submit project'}
        </Button>
      </Box>

      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          gap: 2,
        }}
      >
        <Button
          data-cy="ShowMobileListButton"
          icon="step"
          sx={{ display: ['flex', 'flex', 'none'], zIndex: 1000 }}
          onClick={() => mapState.setIsMobile(true)}
          small
        >
          Show list view
        </Button>
      </Flex>

      {mapState.filteredPins && (
        <Clusters
          pins={mapState.filteredPins}
          onPinClick={mapState.selectPinWithClusterCheck}
          onClusterClick={(cluster) => {
            mapState.fitBounds(cluster.getBounds());
          }}
          clusterGroupRef={clusterGroupRef}
        />
      )}

      {/* Initiative Submission Form (placing mode) */}
      {pendingInitiativePlacement && (
        <InitiativeSubmissionForm
          lat={pendingInitiativePlacement.lat}
          lng={pendingInitiativePlacement.lng}
          onSave={() => setPendingInitiativePlacement(null)}
          onCancel={() => setPendingInitiativePlacement(null)}
        />
      )}

      {/* Initiative Drawer */}
      {mapState.selectedPin && isInitiative(mapState.selectedPin) && (
        <InitiativeDrawer pin={mapState.selectedPin} onClose={() => mapState.selectPin(null)} />
      )}

      {/* Default User Popup */}
      {mapState.selectedPin && !isInitiative(mapState.selectedPin) && (
        <Popup
          activePin={mapState.selectedPin}
          mapRef={mapRef}
          onClose={() => mapState.selectPin(null)}
        />
      )}
    </Map>
  );
};
