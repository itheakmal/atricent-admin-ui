import React from 'react'
import { ListingCars } from './Cars/ListingCars'
import AddCar from './Cars/AddCar'
import { ListingOrders } from './Orders/ListingOrders'

export const Home = () => {
    return (
        <div>
            {/* <ListingCars /> */}
            <ListingOrders />
        </div>
    )
}
