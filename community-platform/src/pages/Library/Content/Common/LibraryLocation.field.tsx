import { MapWithPin } from 'oa-components';
import type { ILatLng } from 'oa-shared';
import { useRef, useState } from 'react';
import { Field } from 'react-final-form';
import type { Map as MapType } from 'react-leaflet';
import { FormFieldWrapper } from 'src/pages/common/FormFields';

import { intro } from '../../labels';

export const LibraryLocationField = () => {
  const { title } = intro.location;
  const mapRef = useRef<MapType | null>(null);
  const [position, setPosition] = useState<ILatLng>({ lat: 30.0, lng: 19.0 });

  return (
    <FormFieldWrapper htmlFor="location" text={title}>
      <Field name="lat" validateFields={[]}>
        {({ input: latInput }) => (
          <Field name="lng" validateFields={[]}>
            {({ input: lngInput }) => {
              const currentPosition = {
                lat: latInput.value || position.lat,
                lng: lngInput.value || position.lng,
              };

              return (
                <MapWithPin
                  mapRef={mapRef}
                  position={currentPosition}
                  updatePosition={(newPosition) => {
                    latInput.onChange(newPosition.lat);
                    lngInput.onChange(newPosition.lng);
                    setPosition(newPosition);
                  }}
                  center={currentPosition}
                  zoom={2}
                />
              );
            }}
          </Field>
        )}
      </Field>
    </FormFieldWrapper>
  );
};
