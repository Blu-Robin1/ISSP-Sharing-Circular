import { useState } from 'react';
import { Box, Button, Flex, Heading, Input, Label, Select, Text, Textarea } from 'theme-ui';
import type { ScisProjectType } from '../../scis.store';
import { scisStore } from '../../scis.store';

const PROJECT_TYPE_OPTIONS: { value: ScisProjectType; label: string }[] = [
  { value: 'tool_library', label: 'Tool Library' },
  { value: 'repair_cafe', label: 'Repair Café' },
  { value: 'skill_share', label: 'Skill Share' },
  { value: 'workspace', label: 'Shared Workspace' },
  { value: 'other', label: 'Other' },
];

interface InitiativeSubmissionFormProps {
  lat: number;
  lng: number;
  onSave: () => void;
  onCancel: () => void;
}

export const InitiativeSubmissionForm = ({
  lat,
  lng,
  onSave,
  onCancel,
}: InitiativeSubmissionFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState<ScisProjectType>('other');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      scisStore.createLocalInitiative({
        title: title.trim(),
        description: description.trim(),
        projectType,
        lat,
        lng,
      });
      onSave();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: ['100%', '400px'],
        bg: 'white',
        zIndex: 2000,
        boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Heading as="h2" sx={{ mb: 3 }}>
        Submit an Initiative
      </Heading>
      <Text sx={{ fontSize: 1, color: 'grey', mb: 3 }}>
        Location: {lat.toFixed(5)}, {lng.toFixed(5)}
      </Text>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="initiative-title">Title *</Label>
        <Input
          id="initiative-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Community Tool Library"
          required
          sx={{ mb: 2 }}
        />

        <Label htmlFor="initiative-project-type">Project Type</Label>
        <Select
          id="initiative-project-type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as ScisProjectType)}
          sx={{
            mb: 2,
            width: '100%',

            // fix arrow alignment
            height: '44px',
            lineHeight: '44px',
            py: 0,
            px: 2,
            pr: '44px', // room for the arrow

            borderColor: 'muted',
            borderRadius: 2,
            bg: 'background',

            // center the built-in Theme UI arrow
            backgroundPosition: 'right 14px center',
            backgroundSize: '16px 16px',
            appearance: 'none',
          }}
        >
          {PROJECT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>

        <Label htmlFor="initiative-description">Description</Label>
        <Textarea
          id="initiative-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of your initiative..."
          rows={4}
          sx={{ mb: 3 }}
        />

        <Flex sx={{ gap: 2 }}>
          <Button type="submit" disabled={submitting || !title.trim()}>
            {submitting ? 'Saving...' : 'Save Initiative'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </form>

      <Text sx={{ fontSize: 0, mt: 3, color: 'grey' }}>
        Your initiative will appear immediately and is marked &quot;pending moderation&quot; until
        approved by an admin.
      </Text>
    </Box>
  );
};
