import {memo} from 'react';
import {YMaps, Map as YMap, Placemark} from 'react-yandex-maps';

type PropsType = {
  width?: string | number;
};

const mapData = {
  center: [56.791449, 59.909933],
  zoom: 16,
};
const coordinate = [56.791449, 59.909933];
const options = {
  searchControlProvider: 'гриль контора ревда',
};

const Map: React.FC<PropsType> = memo(({width = '100%'}) => (
  <div className="filter-grayscale ">
    <YMaps>
      <YMap height={500} width={width} defaultState={mapData} options={options}>
        <Placemark
          geometry={coordinate}
          options={{
            iconLayout: 'default#image',
            iconImageHref: '/roundLogo.png',
            iconImageSize: [40, 40],
          }}
        />
      </YMap>
    </YMaps>
  </div>
));

Map.displayName = 'Map';

export default Map;
