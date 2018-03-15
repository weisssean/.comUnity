import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {withScriptjs} from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";


export default compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQzy1qHs-KTeLmP5akKRBNObB0ivMLmGk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.setState({
                        places,
                    });

                   this.props.onPlacesChanged(places)
                },
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        {/*<label htmlFor="address-bod">Lookup</label>*/}
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <div className="field">
            <input
                type="text"
                className="form-control"
                name="address-bod"
                placeholder="Look up an address"
            /></div>
        </StandaloneSearchBox>
    </div>
);
