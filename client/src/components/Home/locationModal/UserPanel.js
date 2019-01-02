import React from 'react';
import PropTypes from 'prop-types';
import SelectType from "../../NewLocation/SelectType";

const UserPanel = ({user}) => {
    return (
        <div>
            {
                user.photos && user.photos[0] &&
                <img src={user.photos[0]}
                     className="user-image location-user-image"/>
            }
        </div>
    )
};


SelectType.propTypes = {
    user: PropTypes.object.isRequired
};
export default UserPanel;
