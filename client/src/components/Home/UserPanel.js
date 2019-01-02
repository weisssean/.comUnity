import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as userActions from "../../actions/userActions";
import {bindActionCreators} from "redux";
import anon from '../../assets/images/anonymus.png'
// import {GoogleLogin} from 'react-google-login';
import toastr from "toastr";


class UserPanel extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {

    }

    onUserImageError(e) {
        e.currentTarget.src = "../../assets/images/anonymus.png";
    }

    render() {
        const {user} = this.props;
        return (
            <div className="user-panel">

                {user.id && <div>
                    <img className="user-image"
                         onError={this.onUserImageError}//e => e.src = "./assets/images/anonymus.png"
                         src={user.photos&&user.photos[0] ? user.photos[0] : anon}
                    />
                    <div className="nav-link">
                        {/*<img src={user ? user.uImg : anon}/>*/}
                        <span className="user-name">{user.displayName}</span>


                    </div>
                </div>
                }{
                !user.id && <div id="my-g-signin2"/>}
                {/*<GoogleLogin*/}
                {/*style={{padding:"0"}}*/}
                {/*className="g-signin2"*/}
                {/*// buttonText="&nbsp;"*/}
                {/*clientId="1065581965722-4ok4388etmmjcleacsnp0sjjgj1p1d0q.apps.googleusercontent.com"*/}
                {/*onSuccess={this.onSuccess}*/}
                {/*onFailure={this.onFailure}*/}
                {/*/>*/}
            </div>
        );
    }
}

UserPanel.propTypes = {
    // showLocationModal: PropTypes.bool
};

//redux connect and map functions
function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPanel));
