import React from 'react';
import {Marker} from 'react-google-maps';

const ClickableMapMarker = (props) => {

    const onMarkerClick = () => {
        const {id,onMarkerClick} = props;
        onMarkerClick(id);
    };

    return (
        <Marker
            onClick={onMarkerClick}
            {...props}
        />
    );
};

export default ClickableMapMarker;