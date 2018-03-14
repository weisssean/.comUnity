import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationsActions from "../../actions/locationsActions";
import PropTypes from 'prop-types';

import TextInput from "../common/TextInput";
import {
    Button,
    Card,
    CardGroup,
    CardText,
    CardTitle,
    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import toastr from "toastr";
import MiniMap from "./MiniMap";
import AddressLookupModal from "./AddressLookupModal";
import TextWithButtonInput from "../TextWithButtonInput";
import SelectType from "./SelectType";
import ImageUpload from "./ImageUpload";
import uuid from 'uuid/v4';
import axios from "axios";


class NewLocationForm extends React.Component {
    constructor(props) {
        super(props);
        this.clearTempImages();
        this.state = {
            addressSearchModal: false,
            activeTab: "1",
            mapCenter: {
                lat: 42.2793,
                lng: -71.4162
            },
            errors: {},
            newImageUrls: [],
            form: {
                status: 1,
                uuid: uuid(),
                name: "",
                desc: "",
                type: 1,
                phone: "",
                email: "",
                address: "",
                lat: 42.2793,
                lng: -71.4162,
                userId: props.user.uId,
                userImageUrl: props.user.uImg,
                imageURLs: []
            }
        };


        this.updateFormState = this.updateFormState.bind(this);
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.selectType = this.selectType.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.toggleAddressSearch = this.toggleAddressSearch.bind(this);
        this.toggleTabs = this.toggleTabs.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.locationFormIsValid = this.locationFormIsValid.bind(this);
        this.setFormById = this.setFormById.bind(this);

    }

    clearTempImages() {
        const url = "http://localhost:9090/cleartemp";
        axios.get(url, {
            params: {},
        })
    }

    setFormById(locId) {

        this.props.actions.getLocationById(locId).then(loc => {
            const form = {
                status: loc.status,
                uuid: loc.uuid,
                name: loc.name,
                desc: loc.desc,
                type: loc.type,
                phone: loc.phone,
                email: loc.email,
                address: loc.address,
                lat: loc.lat,
                lng: loc.lng,
                userId: loc.userId,
                imageURLs: loc.imageURLs,
                userImageUrl: loc.userImageUrl
            };
            this.setState({form: form});
        }).catch(exception => {
            toastr.error(exception);
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.locId && (this.props.match.params.locId !== nextProps.match.params.locId || this.props.locations !== nextProps.locations)) {
            this.setFormById(nextProps.match.params.locId);
        }
    }

    componentDidMount() {
        if (this.props.match.params.locId && this.props.locations.length > 0) {
            this.setFormById(this.props.match.params.locId);
        }
    }

    selectType(event) {
        const type = event.target.value;
        let form = this.state.form;
        form.type = type;
        this.setState({form: form});
    }

    updateFormState(event) {
        const field = event.target.name;
        let form = this.state.form;
        form[field] = event.target.value;
        return this.setState({form: form});
    }

    onDragEnd(event) {
        let form = this.state.form;
        form.lat = event.latLng.lat();
        form.lng = event.latLng.lng();
        return this.setState({form: form, mapCenter: {lat: form.lat, lng: form.lng}});
    }

    onPlacesChanged(address) {
        let form = this.state.form;
        form.address = address.formatted_address;
        form.lat = address.geometry.location.lat();
        form.lng = address.geometry.location.lng();
        this.setState({form: form, mapCenter: {lat: form.lat, lng: form.lng}});
        this.toggleAddressSearch();
    }


    toggleAddressSearch() {
        this.setState({
            addressSearchModal: !this.state.addressSearchModal
        });
    }

    toggleTabs(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    locationFormIsValid() {
        const validateEmail = (email) => {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
                return (true)
            }
            return (false)
        };

        const validatePhone = (phone) => {
            if (/((?:\+|00)[17](?: |-)?|(?:\+|00)[1-9]\d{0,2}(?: |-)?|(?:\+|00)1-\d{3}(?: |-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |-)[0-9]{3}(?: |-)[0-9]{4})|([0-9]{7}))/.test(phone)) {
                return (true)
            }
            return (false)
        };

        let formIsValid = true;
        let errors = {};

        /*Email*/
        if (this.state.form.email) {
            if (this.state.form.email.trim().length < 5) {
                errors.email = 'Email is too short.';
                formIsValid = false;
            }
            if (!validateEmail(this.state.form.email)) {
                errors.email = 'Must be in email format.';
                formIsValid = false;
            }
        }

        /*Phone*/
        if (this.state.form.phone && !validatePhone(this.state.form.phone)) {
            errors.phone = 'Must be a valid phone #.';
            formIsValid = false;
        }
        if (this.state.form.phone && this.state.form.phone.trim().length > 20) {
            errors.phone = 'Phone number is too long.';
            formIsValid = false;
        }
        /*Name*/
        if (this.state.form.name.trim().length < 5) {
            errors.name = 'Name is too short.';
            formIsValid = false;
        }
        /*Address*/
        if (this.state.form.address.trim().length > 1500) {
            errors.name = 'Address is too long.';
            formIsValid = false;
        }
        /*Description*/
        if (this.state.form.desc.trim().length < 20) {
            errors.desc = 'Description is too short.';
            formIsValid = false;
        }
        if (this.state.form.desc.trim().length > 1500) {
            errors.desc = 'Description is too long.';
            formIsValid = false;
        }
        if (!this.state.form.lat) {
            errors.lat = 'Latitude is missing, select the location on the map.';
            formIsValid = false;
        }
        if (!this.state.form.lng) {
            errors.lng = 'Longitude is missing, select the location on the map.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.locationFormIsValid()) {
            let form = this.state.form;
            form.imageURLs = form.imageURLs.concat(this.state.newImageUrls);// Object.assign([],...form.imageURLs,...this.state.newImageUrls);

            this.setState({form: form}, () => {
                this.props.actions.saveLocation(this.state.form, this.props.match.params.locId).then(res => {
                    toastr.success(`save location result: ${res}`);
                    this.props.history.push("/");
                }).catch(error => {
                    toastr.error(error);
                    // this.props.actions.callSuccess();
                    throw(error);
                });

            });


        }
    }

    uploadSuccess(data) {
        let form = this.state.form;

        data = data.map(url => {
            return url.replace("temp", "images");
        });

        this.setState({newImageUrls: data});
    }

    render() {
        return (
            <div className="container">
                <AddressLookupModal className="address-search-modal"
                                    show={this.state.addressSearchModal}
                                    toggleModule={this.toggleAddressSearch} onPlacesChanged={this.onPlacesChanged}/>
                <form onSubmit={this.onSubmit}>
                    <Row>
                        <Col lg={4} md={5} sm={6} xs={12}>
                            <SelectType selectedType={this.state.form.type} selectType={this.selectType}/>
                            <div className="minimap-holder">
                                <div className="minimap-inner-holder">
                                    <MiniMap
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQzy1qHs-KTeLmP5akKRBNObB0ivMLmGk&v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{height: `100%`, width: "100%"}}/>}
                                        containerElement={<div style={{height: `100%`, width: "100%"}}/>}
                                        mapElement={<div style={{height: `100%`, width: "100%"}}/>}
                                        defaultCenter={{lat: this.state.form.lat, lng: this.state.form.lng}}
                                        location={this.state.form}
                                        onDragEnd={this.onDragEnd}
                                        onPlacesChanged={this.onPlacesChanged}
                                        center={this.state.mapCenter}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col lg={8} md={7} sm={6} xs={12}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '1' ? "active" : ""}
                                        onClick={() => {
                                            this.toggleTabs('1');
                                        }}>
                                        Location
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={this.state.activeTab === '2' ? "active" : ""}
                                        onClick={() => {
                                            this.toggleTabs('2');
                                        }}>
                                        Images
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <br/>
                                    <Row>
                                        <Col md="6" sm={12}>
                                            <TextInput name={"name"}
                                                       value={this.state.form.name}
                                                       error={this.state.errors.name}
                                                       rows={"1"}
                                                       label={"Location Name"}
                                                       onChange={this.updateFormState}/>
                                        </Col>
                                        <Col md="6" sm={12}>

                                            <TextWithButtonInput name={"address"}
                                                                 value={this.state.form.address}
                                                                 error={this.state.errors.address}
                                                                 rows={"1"}
                                                                 label={"Address"}
                                                                 onChange={this.updateFormState}
                                                                 onClick={this.toggleAddressSearch}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <TextInput name={"desc"}
                                                       value={this.state.form.desc}
                                                       error={this.state.errors.desc}
                                                       rows={"10"}
                                                       type="textarea"
                                                       label={"Description"}
                                                       onChange={this.updateFormState}/>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" sm={12}>
                                            <TextInput name={"phone"}
                                                       value={this.state.form.phone}
                                                       error={this.state.errors.phone}
                                                       rows={"1"}
                                                       type={"phone"}
                                                       label={"Phone Number"}
                                                       onChange={this.updateFormState}/>
                                        </Col>
                                        <Col md="6" sm={12}>
                                            <TextInput name={"email"}
                                                       value={this.state.form.email}
                                                       error={this.state.errors.email}
                                                       rows={"1"}
                                                       type={"email"}
                                                       label={"Email"}
                                                       onChange={this.updateFormState}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6" sm={12}>
                                            <TextInput name={"lat"}
                                                       value={"" + this.state.form.lat}
                                                       error={this.state.errors.lat}
                                                       rows={"1"}
                                                       type={"number"}
                                                       label={"Latitude"}
                                                       onChange={this.updateFormState}/>
                                        </Col>
                                        <Col md="6" sm={12}>
                                            <TextInput name={"lng"}
                                                       value={"" + this.state.form.lng}
                                                       error={this.state.errors.lng}
                                                       rows={"1"}
                                                       type={"number"}
                                                       label={"Longitude"}
                                                       onChange={this.updateFormState}/>
                                        </Col>
                                    </Row>
                                    <br/>

                                </TabPane>
                                <TabPane tabId="2">

                                    <ImageUpload uploadSuccess={this.uploadSuccess} name={this.state.form.name}
                                                 currentImages={this.state.form.imageURLs}/>
                                    {this.props.location.imageURLs &&
                                    <CardGroup>
                                        {
                                            this.state.form.imageURLs.map((url, i) =>

                                                <Card key={i} body>
                                                    <CardTitle>Special Title Treatment</CardTitle>
                                                    <CardText>With supporting text below as a natural lead-in to
                                                        additional
                                                        content.</CardText>
                                                    <img src={url}/>
                                                    <Button>Go somewhere</Button>
                                                </Card>
                                            )
                                        }
                                    </CardGroup>}
                                </TabPane>
                            </TabContent>


                            <br/>
                            <Button size="lg" color="success">SAVE</Button>

                            <br/>
                            <br/>

                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

NewLocationForm.propTypes = {
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        locations: state.locations,
        user: state.user,
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationsActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewLocationForm));

