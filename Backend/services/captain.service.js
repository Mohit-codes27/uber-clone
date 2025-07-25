const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  firstName, lastName, email, password, color, plate, capacity, vehicleType  
})=>{
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('Please enter all fields');
    }
    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}