import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Card, CardGroup, CardText, CardTitle, Modal, ModalBody} from 'reactstrap';

class LocationModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }


    render() {
        const {location} = this.props;
        return (
            <div>
                {
                    this.props.location.name &&
                    <Modal isOpen={this.props.show} toggle={this.props.toggleModule}
                           className={this.props.className ? this.props.className : ""}>

                        {/*<ModalHeader*/}
                        {/*toggle={this.props.toggleModule}>{`Location: ${this.props.location.name}`}</ModalHeader>*/}
                        <ModalBody>

                            <Card body>
                                <CardTitle>{`Location: ${location.name}`}</CardTitle>
                                <CardText>{location.desc}</CardText>
                                {/*<Button>Go somewhere</Button>*/}
                            </Card>
                            {this.props.location.imageURLs &&
                            <CardGroup>
                                {
                                    this.props.location.imageURLs.map((url, i) =>

                                        <Card key={i} body>
                                            <img src={url}/>
                                        </Card>
                                    )
                                }
                            </CardGroup>
                            }
                        </ModalBody>
                        {/*<ModalFooter>*/}
                        {/*<Button color="secondary" onClick={this.props.toggleModule}>Cancel</Button>&nbsp;*/}
                        {/*<Button color="primary" onClick={this.delete}>Delete</Button>*/}
                        {/*</ModalFooter>*/}

                    </Modal>
                }
            </div>
        );
    }
}

LocationModal.propTypes = {
    className: PropTypes.string,
    location: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    toggleModule: PropTypes.func.isRequired
};

export default LocationModal;
