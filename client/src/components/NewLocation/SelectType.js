import React from 'react';
import beehiveIcon from '../../assets/images/icons/beehive2.png';
import gardenIcon from '../../assets/images/icons/garden3.png';
import eggsIcon from '../../assets/images/icons/eggs.png';
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem} from 'reactstrap';

const SelectType = ({selectedType, selectType}) => {
    return (
        <div>
            <ListGroup>
                <ListGroupItem value={"1"} action active={selectedType === 1}
                               onClick={selectType}><img className="form-icon" alt="Garden" src={gardenIcon}/>
                </ListGroupItem>
                <ListGroupItem value={"2"} action active={selectedType === 2}
                               onClick={selectType}><img className="form-icon" alt="Beehive" src={beehiveIcon}/>
                </ListGroupItem>
                <ListGroupItem value={"3"} action active={selectedType === 3}
                               onClick={selectType}><img className="form-icon" alt="Eggs" src={eggsIcon}/>
                </ListGroupItem>
            </ListGroup>
        </div>);
};


SelectType.propTypes = {
    selectedType: PropTypes.number.isRequired,
    selectType: PropTypes.func.isRequired,
};

export default SelectType;