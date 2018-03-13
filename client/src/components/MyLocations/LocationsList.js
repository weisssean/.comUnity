import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationsActions from "../../actions/locationsActions";
import {Link, withRouter} from 'react-router-dom';

import {
    Button,
    Card,
    // CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row,
    Col
} from 'reactstrap';
import PropTypes from 'prop-types';


class LocationsList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};


    }


    render() {
        const {locations} = this.props;
        return (
            <div className="container">
                {locations.map((l, i) => {
                        return (
                            <Row key={i} style={{marginTop:"1rem", marginBottom:"1rem"}}>
                                <Col>
                                    <Card outline color="secondary">
                                        {/*<CardImg top width="100%"*/}
                                                 {/*src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"*/}
                                                 {/*alt="Card image cap"/>*/}
                                        {/*<CardBody>*/}
                                            <CardTitle>{l.name}</CardTitle>
                                            <CardSubtitle>{l.type}</CardSubtitle>
                                            <CardText>{l.desc}</CardText>
                                            <Link to={`/edit-location/${l.uuid}`}>
                                                <Button>Button</Button>
                                            </Link>
                                        {/*</CardBody>*/}
                                    </Card>
                                </Col>
                            </Row>
                        )
                    }
                )}
            </div>
        );
    }
}

LocationsList.propTypes = {
    locations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        locations: state.locations,
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationsActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationsList));

