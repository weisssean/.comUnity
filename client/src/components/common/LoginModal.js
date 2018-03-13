import React from 'react';
import PropTypes from 'prop-types';
// import {GoogleLogin} from 'react-google-login';
// import {withCookies} from 'react-cookie';
import toastr from 'toastr';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';


class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess(retval) {
        const {cookies,toggleModule} = this.props;
        console.log("retval", retval);
        debugger;
        // cookies.set("uid", retval.profileObj.googleId,3600);
        // cookies.set("name", retval.profileObj.name,3600);
        // cookies.set("imageUrl", retval.profileObj.imageUrl,3600);
        cookies.set("guser", JSON.stringify(retval.profileObj));
        toggleModule();
    }

    onFailure(retval) {
        const {cookies,toggleModule} = this.props;
        debugger;
        cookies.set("guser", "");
        toastr.error(`Login unsuccessful: ${retval.error}`);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.props.toggleModule}
                       className={this.props.className ? this.props.className : ""}>
                    <ModalHeader toggle={this.props.toggleModule}>{"Sign in"}</ModalHeader>
                    <ModalBody>
                        <div className="g-signin2" data-onsuccess="onSignIn"/>

                        <br/>
                        {/*<GoogleLogin*/}
                            {/*className="btn-g-login"*/}
                            {/*buttonText="&nbsp;"*/}
                            {/*clientId="1065581965722-4ok4388etmmjcleacsnp0sjjgj1p1d0q.apps.googleusercontent.com"*/}
                            {/*onSuccess={this.onSuccess}*/}
                            {/*onFailure={this.onFailure}*/}
                        {/*/>*/}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool.isRequired,
    toggleModule: PropTypes.func.isRequired
};

export default  LoginModal;
