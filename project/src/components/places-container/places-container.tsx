import Map from '../map/map';
import PlaceList from '../places-list/places-list';
import {useAppSelector} from '../../hooks';
import {PlacesSorting} from "../places-options/places-options";
import {Spinner} from "../spinner/spinner";

function PlacesContainer() {
  const locationName = useAppSelector((state) => state.locationName);
  const sort = useAppSelector((state) => state.sort);
  const placeCardList = useAppSelector((state) => state.places)
    .filter((item) => item.city.name === locationName)
    .sort(sort.compare);

  const isDataLoading = useAppSelector((state) => state.isPlacesDataLoading);
  if (isDataLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {placeCardList.length
              ? `${placeCardList.length} places to stay in ${locationName}`
              : 'No places to stay available'}
          </b>
          <PlacesSorting />
          <PlaceList className="cities__places-list" placeCardList={placeCardList} onMouseEnterCallback={() => {}} />
        </section>
        <div className="cities__right-section">
          {Boolean(placeCardList.length) && <Map className="cities__map" city={placeCardList[0].city} placeCardList={placeCardList} selectedPlaceCard={undefined} />}
        </div>
      </div>
    </div>
  );
}

export default PlacesContainer;
