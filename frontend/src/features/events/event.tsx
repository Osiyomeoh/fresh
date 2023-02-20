import { WhiteButton } from '../../common/components/Buttons';
import { gradientIdx } from '../../common/gradients';
import { SlashauthEvent } from '../../model/event';

type Props = {
  event: SlashauthEvent;
  idx: number;
};

export const EventElem = ({ event, idx }: Props) => {
  return (
    <div className="flex items-start">
      <div className="h-[242px] w-[242px] overflow-hidden relative">
        <img
          src={gradientIdx(idx)}
          className="absolute h-full"
          alt="Home Gradient"
        />
      </div>
      <div className="flex flex-col items-start justify-start ml-4 space-y-2">
        <div className="text-[24px] font-semibold">{event.name}</div>
        <div className="text-[16px]">{event.description}</div>
        <div className="text-[16px]">
          {new Date(event.dateTime).toLocaleDateString()}
        </div>
        {event.link && (
          <a href={event.link} target="_blank" rel="noreferrer">
            <WhiteButton onClick={() => console.log('clicked')}>
              Details{' '}
            </WhiteButton>
          </a>
        )}
      </div>
    </div>
  );
};
