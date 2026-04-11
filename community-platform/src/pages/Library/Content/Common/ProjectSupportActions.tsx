import type { ProjectSupportActionType } from 'oa-shared';
import { useState } from 'react';
import { Button, Card, Flex, Text, Textarea } from 'theme-ui';

interface ProjectSupportActionsProps {
  projectId: number;
  onSupportAction: (type: ProjectSupportActionType, data?: any) => void;
  isLoading?: boolean;
}

export const ProjectSupportActions = ({
  projectId,
  onSupportAction,
  isLoading = false,
}: ProjectSupportActionsProps) => {
  const [selectedAction, setSelectedAction] = useState<ProjectSupportActionType | null>(null);
  const [note, setNote] = useState('');
  const [skills, setSkills] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = async () => {
    const data: any = { note };

    switch (selectedAction) {
      case 'volunteer_skills':
        data.skills = skills.split(',').map((s) => s.trim());
        break;
      case 'pledge_membership':
        data.membershipType = membershipType;
        break;
      case 'donate':
        data.amount = parseFloat(amount);
        data.currency = currency;
        break;
    }

    try {
      const formData = new FormData();
      formData.append('actionType', selectedAction!);
      formData.append('data', JSON.stringify(data));

      const response = await fetch(`/api/projects/${projectId}/support`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit support action');
      }

      onSupportAction(selectedAction!, data);
      setSelectedAction(null);
      setNote('');
      setSkills('');
      setMembershipType('');
      setAmount('');
    } catch (error) {
      console.error('Error submitting support action:', error);
      // TODO: Show error message to user
    }
  };

  const renderActionForm = () => {
    if (!selectedAction) return null;

    return (
      <Card sx={{ p: 3, mt: 2 }}>
        <Text sx={{ fontWeight: 'bold', mb: 2 }}>{getActionTitle(selectedAction)}</Text>

        {selectedAction === 'volunteer_skills' && (
          <div>
            <Text sx={{ mb: 1 }}>Skills you can offer:</Text>
            <Textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. woodworking, electronics, design"
              sx={{ mb: 2 }}
            />
          </div>
        )}

        {selectedAction === 'pledge_membership' && (
          <div>
            <Text sx={{ mb: 1 }}>Membership type:</Text>
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
            >
              <option value="">Select type</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
              <option value="founding">Founding</option>
            </select>
          </div>
        )}

        {selectedAction === 'donate' && (
          <div>
            <Text sx={{ mb: 1 }}>Donation amount:</Text>
            <Flex sx={{ gap: 2, mb: 2 }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                style={{ flex: 1, padding: '8px' }}
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ padding: '8px' }}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </Flex>
          </div>
        )}

        {(selectedAction === 'volunteer_skills' ||
          selectedAction === 'pledge_membership' ||
          selectedAction === 'donate' ||
          selectedAction === 'champion') && (
          <div>
            <Text sx={{ mb: 1 }}>Additional note (optional):</Text>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any additional information..."
              sx={{ mb: 2 }}
            />
          </div>
        )}

        <Flex sx={{ gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={() => setSelectedAction(null)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Flex>
      </Card>
    );
  };

  return (
    <div>
      <Text sx={{ fontWeight: 'bold', mb: 2 }}>Support This Project</Text>
      <Flex sx={{ gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outline"
          sx={{ fontSize: 1 }}
          onClick={() => setSelectedAction('add_my_name')}
          disabled={isLoading}
        >
          Add My Name
        </Button>
        <Button
          variant="outline"
          sx={{ fontSize: 1 }}
          onClick={() => setSelectedAction('volunteer_skills')}
          disabled={isLoading}
        >
          Volunteer Skills
        </Button>
        <Button
          variant="outline"
          sx={{ fontSize: 1 }}
          onClick={() => setSelectedAction('pledge_membership')}
          disabled={isLoading}
        >
          Pledge Membership
        </Button>
        <Button
          variant="outline"
          sx={{ fontSize: 1 }}
          onClick={() => setSelectedAction('donate')}
          disabled={isLoading}
        >
          Donate
        </Button>
        <Button
          variant="outline"
          sx={{ fontSize: 1 }}
          onClick={() => setSelectedAction('champion')}
          disabled={isLoading}
        >
          Champion
        </Button>
      </Flex>

      {renderActionForm()}
    </div>
  );
};

function getActionTitle(type: ProjectSupportActionType): string {
  switch (type) {
    case 'add_my_name':
      return 'Add My Name as Supporter';
    case 'volunteer_skills':
      return 'Volunteer Your Skills';
    case 'pledge_membership':
      return 'Pledge Membership';
    case 'donate':
      return 'Make a Donation';
    case 'champion':
      return 'Become a Champion';
  }
}
