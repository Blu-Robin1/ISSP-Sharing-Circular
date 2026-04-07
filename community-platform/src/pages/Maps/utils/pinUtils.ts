import type { LatLngBounds } from 'leaflet';
import type { IBoundingBox, MapPin } from 'oa-shared';

const filterByLatLong = (boundaries: IBoundingBox, pins: MapPin[]): MapPin[] => {
  return pins.filter(({ lat, lng }) => {
    const inLat = lat >= boundaries._southWest.lat && lat <= boundaries._northEast.lat;
    const inLng = lng >= boundaries._southWest.lng && lng <= boundaries._northEast.lng;
    return inLat && inLng;
  });
};

export const sortPinsByBadgeThenLastActive = (pins: MapPin[], badgeName: string): MapPin[] => {
  return [...pins].sort((a, b) => {
    const aHasBadge = a.profile?.badges?.some((badge) => badge.name === badgeName) ?? false;
    const bHasBadge = b.profile?.badges?.some((badge) => badge.name === badgeName) ?? false;

    if (aHasBadge && !bHasBadge) return -1;
    if (!aHasBadge && bHasBadge) return 1;

    const aTime = a.profile?.lastActive ? new Date(a.profile.lastActive).getTime() : 0;
    const bTime = b.profile?.lastActive ? new Date(b.profile.lastActive).getTime() : 0;
    return bTime - aTime;
  });
};

export const filterPins = (
  allPins: MapPin[],
  filters: {
    tags?: number[];
    types?: string[];
    badges?: string[];
    settings?: string[];
    boundaries?: LatLngBounds;

    // SCIS additions
    projectStages?: number[];
    onlyProjects?: boolean;

    // Backwards compatibility for older callers
    initiativeStages?: number[];
    onlyInitiatives?: boolean;
  },
): MapPin[] => {
  if (!allPins?.length) {
    return [];
  }

  const {
    tags,
    types,
    badges,
    settings,
    boundaries,
    projectStages,
    onlyProjects,
    initiativeStages,
    onlyInitiatives,
  } = filters;

  const activeProjectStages = projectStages ?? initiativeStages;
  const projectOnly = onlyProjects ?? onlyInitiatives ?? false;
  const isProjectPin = (pin: any) => pin?.type === 'project' || pin?.type === 'initiative';

  // Split projects away from maker pins (do NOT mutate originals)
  let projectPins = allPins.filter((p: any) => isProjectPin(p)) as any[];
  let makerPins = allPins.filter((p: any) => !isProjectPin(p)) as any[];

  // Apply project stage filters (if selected)
  if (activeProjectStages?.length) {
    projectPins = projectPins.filter((p: any) => {
      const s = Number(p?.effectiveStage ?? p?.stage ?? p?.scis?.stage);
      return Number.isFinite(s) && activeProjectStages.includes(s);
    });
  }

  // Apply existing OneArmy filters only to maker pins
  if (tags?.length) {
    makerPins = makerPins.filter((x: any) =>
      tags.every((tag) => x.profile?.tags?.some((profileTag: any) => profileTag.id === tag)),
    );
  }

  if (types?.length) {
    makerPins = makerPins.filter(
      (x: any) => x.profile?.type?.name && types.includes(x.profile?.type?.name),
    );
  }

  if (badges?.length) {
    makerPins = makerPins.filter((x: any) =>
      x.profile?.badges?.some((badge: any) => badges.includes(badge.name)),
    );
  }

  if (settings?.length) {
    // Right now visitor filter is only setting filter. This should be smarter.
    makerPins = makerPins.filter((x: any) => x.profile?.visitorPolicy?.policy === 'open');
  }

  // Merge results (or show only projects)
  let mergedPins: MapPin[] = projectOnly
    ? (projectPins as any)
    : ([...makerPins, ...projectPins] as any);

  // Boundaries apply to everything
  if (boundaries) {
    mergedPins = filterByLatLong(
      {
        _northEast: boundaries.getNorthEast(),
        _southWest: boundaries.getSouthWest(),
      },
      mergedPins,
    );
  }

  return mergedPins;
};