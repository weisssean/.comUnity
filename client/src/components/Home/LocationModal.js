import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Card, CardGroup, CardText, CardTitle, Modal, ModalBody} from 'reactstrap';
import {bindActionCreators} from "redux";
import * as locationsActions from "../../actions/locationsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class LocationModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userImg:""
        };
        this.getUserImgFromLocation = this.getUserImgFromLocation.bind(this);
    }

    getUserImgFromLocation(uId){
        this.props.actions.getUserImage(uId).then(result=>{
            this.setState({userImg:result})
        }).catch(exception=>{
            debugger;

        })
    }

    componentWillReceiveProps(nextProps) {

        if ( nextProps.loc && this.props.loc !== nextProps.loc) {
            this.getUserImgFromLocation(nextProps.loc.userId);
        }
    }

    render() {
        const {loc} = this.props;
        return (
            <div>
                {
                    this.props.loc.name &&
                    <Modal isOpen={this.props.show} toggle={this.props.toggleModule}
                           className={this.props.className ? this.props.className : ""}>

                        {/*<ModalHeader*/}
                        {/*toggle={this.props.toggleModule}>{`Location: ${this.props.loc.name}`}</ModalHeader>*/}
                        <ModalBody>

                            <Card body>
                                <CardTitle>{`Location: ${loc.name}`}

                                </CardTitle>
                                <img src={this.state.userImg} className="user-image location-user-image"/>
                                <CardText>{loc.desc}</CardText>
                                {/*<Button>Go somewhere</Button>*/}
                            </Card>
                            {this.props.loc.imageURLs &&
                            <CardGroup>
                                {
                                    this.props.loc.imageURLs.map((url, i) =>

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
    actions: PropTypes.object.isRequired,
    className: PropTypes.string,
    loc: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    toggleModule: PropTypes.func.isRequired
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        loc:ownProps.loc
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationsActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationModal));

