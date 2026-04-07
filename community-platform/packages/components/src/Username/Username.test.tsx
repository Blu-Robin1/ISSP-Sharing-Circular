import '@testing-library/jest-dom/vitest';

import { describe, expect, it } from 'vitest';

import { render } from '../test/utils';
import { Username } from './Username';
import {
  // OneBadge,
  // TwoBadges,
  WithoutLocation,
  WithLocation,
} from './Username.stories';

describe('Username', () => {
  it('shows an unknown flag for empty location', () => {
    const { getByTestId } = render(<Username {...WithoutLocation.args} />);

    expect(getByTestId('Username: unknown flag')).toBeInTheDocument();
  });

  it('renders the city location when provided', () => {
    const { getByTestId } = render(<Username {...WithLocation.args} />);

    expect(getByTestId('Username: location')).toHaveTextContent('Tokyo');
  });

  // it('shows one badge', () => {
  //   const { getByTestId } = render(<Username {...OneBadge.args} />)
  //   expect(
  //     getByTestId(`Username: ${OneBadge.args.user.badges[0].name} badge`),
  //   ).toBeInTheDocument()
  // })

  // it('shows two badges', () => {
  //   const { getByTestId } = render(<Username {...TwoBadges.args} />)
  //   expect(
  //     getByTestId(`Username: ${OneBadge.args.user.badges[0].name} badge`),
  //   ).toBeInTheDocument()
  //   expect(
  //     getByTestId(`Username: ${OneBadge.args.user.badges[1].name} badge`),
  //   ).toBeInTheDocument()
  // })
});
