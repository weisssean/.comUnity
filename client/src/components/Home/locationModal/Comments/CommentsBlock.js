import React from 'react';
import PropTypes from 'prop-types';
import TextInput from "../../../common/TextInput";
import Comment from "./Comment";
import * as locationsActions from "../../../../actions/locationsActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Row} from "reactstrap";
import moment from 'moment';
import toastr from "toastr";


class CommentsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      form: {
        comment: ""
      },
      errors: {}
    };

  }

  componentDidMount() {
    if (this.props.locId) {
      this.getComments(this.props.locId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locId && this.props.locId !== nextProps.locId) {
      this.getComments(nextProps.locId);
    }
  }


  updateFormState = (event) => {
    const field = event.target.name;
    let form = this.state.form;
    form[field] = event.target.value;
    return this.setState({form: form});
  };

  addComment = (e) => {
    e.preventDefault();
    if (this.state.form.comment && this.commentFormIsValid()) {
      let form = this.state.form;
      form.userId = this.props.user.id;
      form.user = this.props.user._id;
      // form.time = moment().format();
      form.locationId = this.props.locId;


      this.props.actions
        .saveComment(this.state.form)
        .then(comment => {
          this.setState((prevState) => {
            const comments = prevState.comments;
            comments.push(comment);
            return ({comments, form: {comment: ""}})
          });
        })
        .catch(error => {
          console.log(error);
          toastr.error("Comment not saved!")
        });
    }
  };

  commentFormIsValid = () => {

    let formIsValid = true;
    let errors = {};

    if (this.state.form.comment.trim().length > 160) {
      errors.comment = 'Comment is too long.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  };

  getComments = (locId) => {
    console.log(this.props.actions);
    this.props.actions
      .getCommentsByLocationId(locId)
      .then(result => {
        this.setState({comments: result})
      })
      .catch(exception => {
        console.error(exception);
      })
  };

  render() {
    return (
      <div className="comment-block container">
        <Row>
          <form onSubmit={this.addComment} className="add-comment">
            {
              this.props.user.photos && this.props.user.photos[0] &&
              <img src={this.props.user.photos[0]}
                   className="user-image"/>
            }
            <div className="add-comment-input">
              <TextInput name={"comment"}
                         placeholder={"Comment on this location"}
                         rows={"5"}
                         label={""}
                         onChange={this.updateFormState}
                         error={this.state.errors.comment}
                         value={this.state.form.comment}/>
            </div>
          </form>
        </Row>
        {
          this.state.comments.map(comment => <Comment comment={comment}/>)
        }
      </div>
    )
  }
}

CommentsBlock.propTypes = {
  locId: PropTypes.string.isRequired,
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(locationsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsBlock);
