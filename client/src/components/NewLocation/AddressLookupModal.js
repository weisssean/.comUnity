import React from 'react';
import PropTypes from 'prop-types';

import {ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader} from 'reactstrap';
import AddressSearch from "./AddressSearch";

class AddressLookupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        };
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.onPlaceSelected = this.onPlaceSelected.bind(this);
    }

    onPlacesChanged(addresses) {
        if (addresses && addresses.length === 1) {
            this.props.onPlacesChanged(addresses[0]);
            this.setState({addresses: []});
        } else if (addresses && addresses.length > 1) {
            this.setState({addresses: addresses});
        }
    }
    onPlaceSelected(e){
        const id = e.currentTarget.id;
        const index = parseInt(id.substr("place-".length, id.length))
        this.props.onPlacesChanged(this.state.addresses[index]);
        this.setState({addresses: []});
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.props.toggleModule}
                       className={this.props.className ? this.props.className : ""}>
                    <ModalHeader toggle={this.props.toggleModule}>{"Look up an address"}</ModalHeader>
                    <ModalBody>
                        <AddressSearch onPlacesChanged={this.onPlacesChanged}/>
                        <br/>

                        <ListGroup>
                            {this.state.addresses.length > 1 && this.state.addresses.map((place,i) =>
                                <ListGroupItem href="" id={`place-${i}`} key={place.place_id} onClick={this.onPlaceSelected}>
                                    {place.formatted_address}
                                </ListGroupItem>
                            )}

                        </ListGroup>

                    </ModalBody>
                    {/*<ModalFooter>*/}
                    {/*<Button color="secondary" onClick={this.props.toggleModule}>Cancel</Button>&nbsp;*/}
                    {/*<Button color="primary" onClick={this.delete}>Delete</Button>*/}
                    {/*</ModalFooter>*/}
                </Modal>


            </div>
        );
    }
}

AddressLookupModal.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool.isRequired,
    toggleModule: PropTypes.func.isRequired,
    onPlacesChanged: PropTypes.func.isRequired
};

export default AddressLookupModal;
