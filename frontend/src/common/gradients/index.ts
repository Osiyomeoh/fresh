import accountGradient from './account-gradient.png';
import adminGradient from './admin-gradient.png';
import contactGradient from './contact-gradient.png';
import eventsGradient from './events-gradient.png';
import homeGradient from './home-gradient.png';

const gradients = [
  accountGradient,
  adminGradient,
  contactGradient,
  eventsGradient,
  homeGradient,
];

export const gradientIdx = (idx: number): string => {
  return gradients[idx % gradients.length];
};

export {
  accountGradient,
  adminGradient,
  contactGradient,
  eventsGradient,
  homeGradient,
};
