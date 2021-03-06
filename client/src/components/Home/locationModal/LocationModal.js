import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Row, Col, Card, CardGroup, CardText, CardTitle, Modal, ModalBody} from 'reactstrap';
import {bindActionCreators} from "redux";
import * as locationsActions from "../../../actions/locationsActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import UserPanel from "./UserPanel";
import CommentsBlock from "./Comments/CommentsBlock";

class LocationModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      locUser: {}
    };
  }

  componentDidUpdate(prevProps,prevState,prevContext){
    if (prevProps.loc && this.props.loc !== prevProps.loc) {
      this.setState({locUser: this.props.loc.user})
      // this.getUserImgFromLocation(this.props.loc.user);
    }
  }

  getUserImgFromLocation = (uId) => {
    this.props.actions
      .getUserByUID(uId)
      .then(result => {
        this.setState({locUser: result})
      })
      .catch(exception => {
        console.error(exception);
      })
  };

  render() {
    const {loc} = this.props;
    return (
      <div>
        {
          this.props.loc.name &&
          <Modal isOpen={this.props.show}
                 toggle={this.props.toggleModule}
                 onClosed={this.props.onClosed}
                 className={this.props.className ? this.props.className : ""}>

            {/*<ModalHeader*/}
            {/*toggle={this.props.toggleModule}>{`Location: ${this.props.loc.name}`}</ModalHeader>*/}
            <ModalBody>

              <Card body>
                <CardTitle>{`Location: ${loc.name}`}

                </CardTitle>
                <UserPanel user={this.state.locUser}/>
                <CardText>{loc.desc}</CardText>
                {/*<Button>Go somewhere</Button>*/}
              </Card>
              <br/>
              {
                this.props.loc.imageURLs &&


                this.props.loc.imageURLs.map((url, i) =>
                  <Row>
                    <Col>
                      <Card key={i} body>
                        <img style={{width: "100%"}} src={url}/>
                      </Card>
                    </Col>
                  </Row>
                )

              }
              <CommentsBlock locId={this.props.loc._id}/>
            </ModalBody>
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
  toggleModule: PropTypes.func.isRequired,
  onClosed:PropTypes.func
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
  return {
    loc: ownProps.loc
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(locationsActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocationModal));

