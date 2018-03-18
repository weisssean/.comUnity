import React from 'react';
import PropTypes from 'prop-types';
import {Row} from "reactstrap";

const Comment = ({comment}) => {
    return (
        <Row className="comment-row">
            <img src={comment.user.photos[0].value}
                 className="user-image"/>
            <div className="comment">
                 {comment.comment}
            </div>
        </Row>

//         <div className="add-comment">
//         {
//             this.props.user.photos && this.props.user.photos[0] &&
//         <img src={this.props.user.photos[0].value}
//              className="user-image"/>
// }
//     <div className="add-comment-input">
//         <TextInput name={"addComment"} placeholder={"Comment on this location"} rows={"5"}
//                    label={""} onChange={() => {
//         }}/>
//     </div>
//
//     </div>
    )
};


Comment.propTypes = {
    comment: PropTypes.object.isRequired
};
export default Comment;