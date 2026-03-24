export const scisService = {
  async getInitiatives() {
    // Demo dataset: one initiative for each stage (1–4)
    // Keep them geographically close so you can demo quickly by panning a little.

    return [
      {
        id: 'demo-stage-1',
        title: 'Stage 1: Community Tool Library',
        description:
          'Early interest phase. We need 50 locals to back this idea so we can form a group.',
        lat: 49.2827,
        lng: -123.1207, // Vancouver (downtown)
        stage: 1,
        supporter_count: 24,
        image_url: '',
      },
      {
        id: 'demo-stage-2',
        title: 'Stage 2: Repair Café + Skill Share',
        description:
          'Community formation phase. Volunteer skills, pledge membership, champions, and donate items.',
        lat: 49.2727,
        lng: -123.115, // slightly south-east
        stage: 2,
        supporter_count: 132, // optional, for display if you use it anywhere
        image_url: '',
      },
      {
        id: 'demo-stage-3',
        title: 'Stage 3: Shared Workshop Space',
        description:
          'Ready to build. Plans are drafted and we’re preparing to launch build-out.',
        lat: 49.2895,
        lng: -123.135, // slightly north-west
        stage: 3,
        supporter_count: 310,
        image_url: '',
      },
      {
        id: 'demo-stage-4',
        title: 'Stage 4: Circular Hub Fundraiser',
        description:
          'Fundraising phase. Help fund the space, tools, and initial operating runway.',
        lat: 49.278,
        lng: -123.105, // slightly east
        stage: 4,
        supporter_count: 480,
        image_url: '',
      },
    ];
  },
};