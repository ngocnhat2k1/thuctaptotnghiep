const { response } = require('express');
const Address = require('../models/Address')

class AddressController {
    
    // [GET] /address/:id
    detail(req, res) {
        Address.findOne({ _id: req.params.id, customer: req.user._id })
            .then(data => {
                if (data) {
                    res.json({
                        success: true,
                        data: data
                    })
                } else {
                    res.json({
                        success: false,
                        message: "Address id not found"
                    })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })
    }

    // [PATCH] /addresses/
    create(req, res) {
        const { firstNameReceiver, lastNameReceiver, phoneReceiver, streetName, district, ward, city } = req.body;

        const address = new Address({
            first_name_receiver: firstNameReceiver,
            last_name_receiver: lastNameReceiver,
            customer: req.user._id,
            phone_receiver: phoneReceiver,
            street_name: streetName,
            district: district,
            ward: ward,
            city: city
        })

        Address.findOne({
            first_name_receiver: firstNameReceiver,
            last_name_receiver: lastNameReceiver,
            customer: req.user._id,
            phone_receiver: phoneReceiver,
            street_name: streetName,
            district: district,
            ward: ward,
            city: city
        })
            .then(data => {
                if (data) {
                    res.json({
                        success: false,
                        message: "Addresss is already exist"
                    })
                } else {
                    address.save()
                        .then(result => {
                            if (result === address) {
                                req.user.addresses.push(address._id)
                                req.user.save()
                                    .then(result => {
                                        if (result === req.user) {
                                            res.json({
                                                success: true,
                                                message: "Create new address successfully"
                                            })
                                        } else {
                                            res.json({
                                                success: false,
                                                message: "Add address to customer fail."
                                            })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.json({
                                            success: false,
                                            message: "Something wrong."
                                        })
                                    })
                            } else {
                                res.json({
                                    success: false,
                                    message: "Create address fail"
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.json({
                                success: false,
                                message: "Something wrong."
                            })
                        })
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })

    }

    // [PUT] /address/:id/update
    update(req, res) {
        const { firstNameReceiver, lastNameReceiver, phoneReceiver, streetName, district, ward, city } = req.body;

        Address.findOne({
            _id: req.params.id,
            customer: req.user._id
        })
            .then(data => {
                if (!data) {
                    res.json({
                        success: false,
                        message: "Address id not found."
                    })
                } else {
                    if (data.first_name_receiver === firstNameReceiver
                        && data.last_name_receiver === lastNameReceiver
                        && data.phoneReceiver === phoneReceiver
                        && data.streetName === streetName
                        && data.district === district
                        && data.ward === ward
                        && data.city === city) {
                        res.json({
                            success: false,
                            message: "You didn't change any address information."
                        })
                    } else {
                        Address.findOne({
                            first_name_receiver: firstNameReceiver,
                            last_name_receiver: lastNameReceiver,
                            customer: req.user._id,
                            phone_receiver: phoneReceiver,
                            street_name: streetName,
                            district: district,
                            ward: ward,
                            city: city
                        })
                            .then(address => {
                                if (address) {
                                    res.json({
                                        success: false,
                                        message: "Addresss is already exist"
                                    })
                                } else {
                                    data.first_name_receiver = firstNameReceiver;
                                    data.last_name_receiver = lastNameReceiver;
                                    data.phone_receiver = phoneReceiver;
                                    data.street_name = streetName;
                                    data.district = district;
                                    data.ward = ward;
                                    data.city = city;

                                    data.save()
                                        .then(savedData => {
                                            if (savedData === data) {
                                                res.json({
                                                    success: true,
                                                    message: "Update address successfully"
                                                })
                                            } else {
                                                res.json({
                                                    success: false,
                                                    message: "Update address fail"
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            res.json({
                                                success: false,
                                                message: "Something wrong"
                                            })
                                        })
                                }
                            })
                            .catch(err => {
                                res.json({
                                    success: false,
                                    message: "Something wrong"
                                })
                            })
                    }
                }
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: "Something wrong"
                })
            })
    }

    // [DELETE] /address/:id => Delete address
    delete(req, res) {
        const index = req.user.addresses.indexOf(req.params.id);

        if (index > -1) {
            req.user.addresses.splice(index, 1)

            req.user.save()
                .then(savedUser => {
                    if (req.user === savedUser) {

                        Address.findOneAndDelete({
                            _id: req.params.id,
                            customer: req.user._id
                        }, function (err, data) {
                            if (err) {
                                res.json({
                                    success: false,
                                    message: "Something wrong"
                                })
                            } else {
                                if (data) {
                                    res.json({
                                        success: true,
                                        message: "Delete address successfully"
                                    })
                                } else {
                                    res.json({
                                        success: false,
                                        message: "Address not found"
                                    })
                                }
                            }
                        })
                    } else {
                        res.json({
                            success: false,
                            message: "Delete address fail"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: "Something wrong"
                    })
                })
        } else {
            return res.json({
                success: false,
                message: "Not found address of customer"
            })
        }
    }

}

module.exports = new AddressController();