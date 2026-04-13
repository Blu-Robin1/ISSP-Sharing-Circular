import { OrganizerDashboard } from './OrganizerDashboard/OrganizerDashboard';

const mockDocs = {
  projects: [
    {
      id: 1,
      slug: 'plastic-recycler',
      title: 'Plastic Recycler Machine',
      usefulCount: 12,
      status: 'Active',
      description:
        'A student-led project focused on turning plastic waste into reusable materials for practical community use.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      donations: 4,
      volunteers: 7,
    },
    {
      id: 2,
      slug: 'campus-garden',
      title: 'Campus Garden Initiative',
      usefulCount: 7,
      status: 'Pending',
      description:
        'An initiative to build a more sustainable campus garden and involve students in local environmental action.',
      image:
        'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
      donations: 2,
      volunteers: 3,
    },
  ],
  research: [],
  questions: [],
};

export default function TestDashboard() {
  return <OrganizerDashboard userCreatedDocs={mockDocs as any} />;
}
