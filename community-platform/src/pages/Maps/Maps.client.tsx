import type { LatLngBounds, Marker } from 'leaflet';
import type { ILatLng, MapPin, ProfileBadge, ProfileTag, ProfileType } from 'oa-shared';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Map as MapType } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router';
import { Box, Flex } from 'theme-ui';
import { MapList } from './Content/MapView/MapList';
import { MapView } from './Content/MapView/MapView';
import { MapContext } from './MapContext';
import { mapPinService } from './map.service';
import { filterPins, sortPinsByBadgeThenLastActive } from './utils/pinUtils';

// SCIS: fetch from API
import { scisService } from './scis.service';
import { computeEffectiveStage, type ScisStage } from './scis.store';

import './styles.css';

const MapsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPlacingProject, setIsPlacingProject] = useState(false);
  const [boundaries, setBoundaries] = useState<LatLngBounds | null>(null);
  const [allPins, setAllPins] = useState<MapPin[] | null>(null);
  const [allProfileTypes, setAllProfileTypes] = useState<ProfileType[]>([]);
  const [allBadges, setAllBadges] = useState<ProfileBadge[]>([]);
  const [allTags, setAllTags] = useState<ProfileTag[]>([]);
  const [allProfileSettings, setAllProfileSettings] = useState<string[]>([]);
  const [activeBadgeFilters, setActiveBadges] = useState<string[]>([]);
  const [activeProfileSettingFilters, setActiveSettings] = useState<string[]>([]);
  const [activeProfileTypeFilters, setActiveTypes] = useState<string[]>([]);
  const [activeTagFilters, setActiveTags] = useState<number[]>([]);

  // SCIS filter state
  const [activeProjectStages, setActiveProjectStages] = useState<number[]>([]);
  const [onlyProjects, setOnlyProjects] = useState(false);

  const [pinLocation, setPinLocation] = useState<ILatLng>({ lat: 30.0, lng: 19.0 });
  const [selectedPin, selectPin] = useState<MapPin | null | undefined>(undefined);
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading...');
  const [isMobile, setIsMobile] = useState(false);
  const [zoom, setZoom] = useState<number>(2);
  const [mapRef, setMapRef] = useState<MapType | null>(null);
  const [clusterGroupRef, setClusterGroupRef] = useState<any>(null);

  // Used to force rebuild of initiative pins when local store changes
  const [scisVersion, setScisVersion] = useState(0);

  const updateMapView = (location: ILatLng, zoomLevel: number) => {
    if (mapRef?.leafletElement) {
      mapRef.leafletElement.setView([location.lat, location.lng], zoomLevel);
    }
    setPinLocation(location);
    setZoom(zoomLevel);
  };

  const panMapTo = (location: ILatLng) => {
    if (mapRef?.leafletElement) {
      mapRef.leafletElement.panTo([location.lat, location.lng]);
    }
  };

  const fitMapBounds = (bounds: LatLngBounds) => {
    if (mapRef?.leafletElement) {
      mapRef.leafletElement.fitBounds(bounds);
    }
  };

  const selectPinAndHandleCluster = (pin: MapPin) => {
    selectPin(pin);

    const clusterGroup = clusterGroupRef?.leafletElement;

    if (clusterGroup?.getLayers && mapRef) {
      const allMarkers = clusterGroup.getLayers();
      const marker = allMarkers.find((m: Marker) => {
        const pos = m.getLatLng();
        return pos.lat === Number(pin.lat) && pos.lng === Number(pin.lng);
      });

      if (marker) {
        const visibleParent = clusterGroup.getVisibleParent(marker);
        if (visibleParent !== marker && visibleParent.getBounds) {
          fitMapBounds(visibleParent.getBounds());
          return;
        }
      }
    }

    panMapTo({ lat: pin.lat, lng: pin.lng });
  };

  const filteredPins = useMemo<MapPin[]>(() => {
    return filterPins(allPins || [], {
      settings: activeProfileSettingFilters,
      badges: activeBadgeFilters,
      types: activeProfileTypeFilters,
      tags: activeTagFilters,
      boundaries: boundaries ?? undefined,

      // SCIS additions
      projectStages: activeProjectStages,
      onlyProjects,
    });
  }, [
    allPins,
    activeProfileSettingFilters,
    activeBadgeFilters,
    activeProfileTypeFilters,
    activeTagFilters,
    boundaries,
    activeProjectStages,
    onlyProjects,
  ]);

  // Keep selectedPin in sync with allPins when store updates (e.g. after adding support)
  useEffect(() => {
    if (selectedPin && allPins && allPins.length > 0) {
      const selectedId = (selectedPin as any)?.id ?? (selectedPin as any)?._id;
      const updatedPin = allPins.find((p: any) => (p.id ?? p._id) === selectedId);
      if (updatedPin && updatedPin !== selectedPin) {
        selectPin(updatedPin);
      }
    }
  }, [allPins, selectedPin]);

  // Keep drawer/popup from sticking around if the pin gets filtered away.
  useEffect(() => {
    if (selectedPin && allPins && allPins.length > 0 && boundaries) {
      const selectedId = (selectedPin as any)?.id ?? (selectedPin as any)?._id;
      const isPinStillVisible = filteredPins.some((pin: any) => (pin.id ?? pin._id) === selectedId);
      if (!isPinStillVisible) {
        selectPin(null);
      }
    }
  }, [filteredPins, selectedPin, allPins, boundaries]);

  const refreshProjects = useCallback(async () => {
    try {
      const projects = await scisService.getInitiatives('approved_and_pending', true);
      const projectPins = projects.map((p) => {
        const rawId = String(p.id);
        const baseStage = Number(p.stage ?? 1);
        const serverCounts = { supporters: p.supporter_count, members: p.member_count, champions: p.champion_count };
        const local = {
          stageOverride: (p.stage_override != null ? p.stage_override : undefined) as ScisStage | undefined,
          stage3Milestones: p.stage3_milestones ?? undefined,
        };
        const effectiveStage = computeEffectiveStage(baseStage, local, serverCounts);
        return {
          id: `project-${rawId}`,
          _id: `project-${rawId}`,
          _created: p.created_at ?? new Date().toISOString(),
          _updated: new Date().toISOString(),
          type: 'project',
          stage: baseStage,
          effectiveStage,
          lat: p.lat,
          lng: p.lng,
          title: p.title,
          description: p.description,
          supporterCount: p.supporter_count,
          memberCount: p.member_count,
          championCount: p.champion_count,
          volunteerCount: p.volunteer_count,
          donateCount: p.donate_count,
          imageUrl: p.image_url ?? '',
          stage3Milestones: p.stage3_milestones,
          projectId: rawId,
          status: p.status,
          moderation: p.status === 'approved' ? 'accepted' : 'awaiting-moderation',
          profile: {
            name: p.title,
            username: `project-${rawId}`,
            photo: p.image_url
              ? { id: `project-photo-${rawId}`, publicUrl: p.image_url }
              : undefined,
            avatar: p.image_url ?? '',
            type: 'member',
          },
        };
      }) as any[];
      setAllPins((prev) => {
        const nonProjects = (prev ?? []).filter((p: any) => p?.type !== 'project');
        return sortPinsByBadgeThenLastActive([...nonProjects, ...projectPins], 'pro');
      });
    } catch {
      // Fallback to full refresh
      setScisVersion((v) => v + 1);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const [pins, filters, userPin] = await Promise.all([
          mapPinService.getMapPins(),
          mapPinService.getMapFilters(),
          mapPinService.getCurrentUserMapPin(),
        ]);

        let pinsToSet: MapPin[] = [];
        if (pins) {
          pinsToSet = pins;
        }

        // SCIS: fetch approved + pending (pending show on map as "Pending approval")
        // noCache when refreshing (e.g. after Add my name) so supporter count updates immediately
        const projects = await scisService.getInitiatives('approved_and_pending', scisVersion > 0);

        const projectPins = projects.map((p) => {
          const rawId = String(p.id);
          const baseStage = Number(p.stage ?? 1);
          const serverCounts = {
            supporters: p.supporter_count,
            members: p.member_count,
            champions: p.champion_count,
          };
          const local = {
            stageOverride: (p.stage_override != null ? p.stage_override : undefined) as ScisStage | undefined,
            stage3Milestones: p.stage3_milestones ?? undefined,
          };
          const effectiveStage = computeEffectiveStage(baseStage, local, serverCounts);

          return {
            id: `project-${rawId}`,
            _id: `project-${rawId}`,
            _created: p.created_at ?? new Date().toISOString(),
            _updated: new Date().toISOString(),

            type: 'project',
            stage: baseStage,
            effectiveStage,

            lat: p.lat,
            lng: p.lng,

            title: p.title,
            description: p.description,
            supporterCount: p.supporter_count,
            memberCount: p.member_count,
            championCount: p.champion_count,
            volunteerCount: p.volunteer_count,
            donateCount: p.donate_count,
            imageUrl: p.image_url ?? '',
            stage3Milestones: p.stage3_milestones,

            projectId: rawId,
            status: p.status,
            moderation: p.status === 'approved' ? 'accepted' : 'awaiting-moderation',

            profile: {
              name: p.title,
              username: `project-${rawId}`,
              photo: p.image_url
                ? { id: `project-photo-${rawId}`, publicUrl: p.image_url }
                : undefined,
              avatar: p.image_url ?? '',
              type: 'member',
            },
          };
        }) as any[];

        pinsToSet = [...pinsToSet, ...projectPins];

        // might be missing because it's not approved
        const existingPinIndex = pinsToSet.findIndex((x) => x.id === userPin?.id);

        if (userPin) {
          if (existingPinIndex >= 0) {
            pinsToSet[existingPinIndex] = userPin;
          } else {
            pinsToSet.push(userPin);
          }
        }

        setAllPins(sortPinsByBadgeThenLastActive(pinsToSet, 'pro'));

        if (filters?.filters) {
          const sortedTypes = (filters.filters.types || []).slice().sort((a, b) => a.order - b.order);

          setAllProfileTypes(sortedTypes);
          setAllBadges(filters.filters.badges || []);
          setAllTags(filters.filters.tags || []);
          setAllProfileSettings(filters.filters.settings || []);
        }

        if (filters?.defaultFilters?.types) {
          setActiveTypes(filters.defaultFilters.types);
        }

        setLoadingMessage('');
      } catch (error) {
        setLoadingMessage(error as any);
      }
    };

    init();
    // Re-run when initiatives change (create, support, contribution)
  }, [scisVersion]);

  const toggleActiveBadgeFilter = (value: string) => {
    if (activeBadgeFilters.includes(value)) {
      setActiveBadges(activeBadgeFilters.filter((x) => x !== value));
    } else {
      setActiveBadges((values) => [...values, value]);
    }
  };

  const toggleActiveProfileSettingFilter = (value: string) => {
    if (activeProfileSettingFilters.includes(value)) {
      setActiveSettings(activeProfileSettingFilters.filter((x) => x !== value));
    } else {
      setActiveSettings((values) => [...values, value]);
    }
  };

  const toggleActiveProfileTypeFilter = (value: string) => {
    if (activeProfileTypeFilters.includes(value)) {
      setActiveTypes(activeProfileTypeFilters.filter((x) => x !== value));
    } else {
      setActiveTypes((values) => [...values, value]);
    }
  };

  const toggleActiveTagFilter = (value: number) => {
    if (activeTagFilters.includes(value)) {
      setActiveTags(activeTagFilters.filter((x) => x !== value));
    } else {
      setActiveTags((values) => [...values, value]);
    }
  };

  // Safe hash navigation for both users and initiatives
  useEffect(() => {
    if (selectedPin) {
      const hash =
        selectedPin.profile?.username ||
        (selectedPin as any).slug ||
        (selectedPin as any).id ||
        (selectedPin as any)._id;

      if (hash) {
        navigate(`/map#${hash}`, { replace: true });
      }
    } else if (selectedPin === null) {
      navigate('/map', { replace: true });
    }
  }, [selectedPin]);

  useEffect(() => {
    const pinId = location.hash.slice(1);
    const username = pinId.length > 0 ? pinId : undefined;

    if (allPins && username) {
      const foundPin = allPins.find((pin: any) => {
        return (
          pin.profile?.username === username ||
          pin.slug === username ||
          pin.id === username ||
          pin._id === username
        );
      });

      if (foundPin) {
        const foundId = (foundPin as any)?.id ?? (foundPin as any)?._id;
        const isPinVisible = filteredPins.some((pin: any) => (pin.id ?? pin._id) === foundId);

        if (isPinVisible && selectedPin?.profile?.username !== username) {
          selectPinAndHandleCluster(foundPin);
        }
      } else {
        selectPin(foundPin);
      }
    }
  }, [location.hash, allPins, filteredPins]);

  return (
    <MapContext.Provider
      value={{
        allPins,
        allProfileTypes,
        allProfileSettings,
        allBadges,
        allTags,
        location: pinLocation,
        setLocation: setPinLocation,
        loadingMessage,
        selectedPin,
        selectPin,
        selectPinWithClusterCheck: selectPinAndHandleCluster,
        filteredPins,
        activeBadgeFilters,
        activeProfileSettingFilters,
        activeProfileTypeFilters,
        activeTagFilters,
        toggleActiveBadgeFilter,
        toggleActiveProfileSettingFilter,
        toggleActiveProfileTypeFilter,
        toggleActiveTagFilter,

        // SCIS filters
activeProjectStages: activeProjectStages,
      setActiveProjectStages: setActiveProjectStages,
      onlyProjects: onlyProjects,
      setOnlyProjects: setOnlyProjects,

        // SCIS submission mode
isPlacingProject,
      setIsPlacingProject,
      refreshProjects: refreshProjects,

        isMobile,
        setIsMobile,
        boundaries,
        setBoundaries,
        zoom,
        setZoom,
        setView: updateMapView,
        panTo: panMapTo,
        fitBounds: fitMapBounds,
        setMapRef,
        setClusterGroupRef,
      }}
    >
      <Box id="mapPage" sx={{ height: 'calc(100vh - 80px)', width: '100%' }}>
        <Flex sx={{ flexDirection: 'row', height: '100%' }}>
          <MapList />
          <MapView />
        </Flex>
      </Box>
    </MapContext.Provider>
  );
};

export default MapsPage;