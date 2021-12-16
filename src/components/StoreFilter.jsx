import React from 'react';
import ProductFilter from './ProductFilter';

const categories = [
    {
        name: 'all',
        label: 'Все'
    },
    {
        name: 'cars',
        label: 'Автомобiлi'
    },
    {
        name: 'weapon',
        label: 'Зброя'
    },
    {
        name: 'items',
        label: 'Предмети'
    },
    {
        name: 'sets',
        label: 'Набори'
    },
    {
        name: 'services',
        label: 'Послуги'
    },

    
];

const Storefilter = () => {
    return (
        <div className="store_filterBlock">
            <ProductFilter filterlist={categories}/>
        </div>
    );
}

export default Storefilter;
