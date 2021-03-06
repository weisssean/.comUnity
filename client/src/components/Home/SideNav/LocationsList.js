import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as locationsActions from "../../../actions/locationsActions";
import {Link, withRouter} from 'react-router-dom';
import {Jumbotron, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import '../../../css/side-nav.css';


class LocationsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const {locations} = this.props;
    return (
      <div className="scroll-rows">
        <Jumbotron>
          <h3>Blog posts</h3>
        </Jumbotron>
        <Row>
          <ListGroup className="users-list">
            <Link to={`blog/123`}>
              <ListGroupItem>
                <ListGroupItemHeading>
                      <span
                        className="txt-nav-link">{'Framingham newsletter'}</span>
                </ListGroupItemHeading>
                <ListGroupItemText>{'this is about stuff'}</ListGroupItemText>
              </ListGroupItem>
            </Link>
          </ListGroup>
        </Row>
        <Jumbotron>
          <h3>Frieborhood</h3>
        </Jumbotron>
        <Row>
          <ListGroup className="users-list">
            {locations.map((l, i) =>
              <Link key={i} to={`/${l._id}`}>
                <ListGroupItem>
                  <ListGroupItemHeading>
                      <span
                        className="txt-nav-link">{l.name}</span>
                  </ListGroupItemHeading>
                  <ListGroupItemText>{l.desc}</ListGroupItemText>
                </ListGroupItem>
              </Link>
            )}
          </ListGroup>
        </Row>
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

