import React from 'react';

const Productfilter = (props) => {
    const filterList = props.filterlist.map((filt) => {
        return (
            <a href={`/products/${filt.name}`} className="filter" name={filt.name} key={filt.name}>
                {filt.label}
            </a>
        );
    });
    
    return filterList;
}

export default Productfilter;
