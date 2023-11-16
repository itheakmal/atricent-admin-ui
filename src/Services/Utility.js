// Define a helper function to validate email format
export const validateEmail = (email) => {
    // Use a regular expression to check if the email is valid
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

export const getBrandNames = (brands) => {
    // console.log('data', data)
    const names = brands.map(item=>item.name)
    return names.join(', ')
}
export const getPrice = (price) => {
    return price / 100
}
export const getAddress = (address) => {
    console.log('address', address)
    const addressd = address.address +' '+ address.city +' '+ address.state +' '+ address.country
    return addressd
}
export const getAddressFormated = (address) => {
    const addressd = {
        zip: address.zipCode,
        street: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
    }
    console.log('address', JSON.stringify(Object.entries(addressd)))
    return addressd
}

export const getProducts = (order) => {
    console.log('order', order)


    
    // return addressd
}