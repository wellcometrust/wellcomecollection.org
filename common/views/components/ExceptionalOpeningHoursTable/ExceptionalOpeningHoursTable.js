import {spacing, font} from '../../../utils/classnames';
import {formatDayDate} from '../../../utils/format-date';
import type {ExceptionalVenueHours} from '../../../model/opening-hours';

type Props = {|
  caption: string,
  venues: ExceptionalVenueHours,
  extraClasses?: string
|}

const ExceptionalOpeningHoursTable = ({caption, venues, extraClasses}: Props) => (
  <div className={extraClasses || ''}>
    <table className={`opening-hours__table ${font({s: 'HNL5'})} ${extraClasses}`}>
      <caption className={`opening-hours__caption ${font({s: 'HNM4'})} ${spacing({s: 2}, {padding: ['top', 'bottom']})}`}>{formatDayDate(caption)}</caption>
      <thead className={`opening-hours__thead ${font({s: 'HNM5'})} visually-hidden`}>
        <tr className='opening-hours__tr'>
          <th scope='col' className={`opening-hours__th`}>Venue</th>
          <th scope='col' className={`opening-hours__th`}>Times</th>
        </tr>
      </thead>
      <tbody className='opening-hours__tbody'>
        {venues.map((venue) => (
          <tr key={venue.name} className='opening-hours__tr'>
            <th className={`opening-hours__th opening-hours__th--row`} scope='row'>{venue.name}</th>
            {venue.openingHours.opens &&
              <td className='opening-hours__td'>
                {venue.opensChanged &&
                  <span className={`${font({s: 'HNM5'})} opening-hours__highlight`}>{venue.openingHours.opens}</span>
                }
                {!venue.opensChanged &&
                  venue.openingHours.opens
                }
                &mdash;
                {venue.closesChanged &&
                  <span className={`${font({s: 'HNM5'})} opening-hours__highlight`}>{venue.openingHours.closes}</span>
                }
                {!venue.closesChanged &&
                  venue.openingHours.closes
                }
              </td>
            }
            {!venue.openingHours.opens &&
              <td className='opening-hours__td'>
                {venue.closesChanged &&
                  <span className={`${font({s: 'HNM5'})} opening-hours__highlight`}>Closed</span>
                }
                {!venue.closesChanged && 'Closed'}
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ExceptionalOpeningHoursTable;
