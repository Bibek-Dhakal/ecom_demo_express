const bcrypt = require('bcrypt');
const Admindb = require('../model/adminModel');
const {NODE_ENV} = require("../env");


async function setSession(req, res, user) {
    delete req.session.loginEmail;
    delete req.session.loginErrMsg;
    delete req.session.loginOTP;
    delete req.session.loginErr;
    req.session.adminLoggedIn = true;
    req.session.adminUser = user;
    console.log(`Admin Logged in Succesfully : ${req.session.adminUser.name}`)
    res.redirect('/admin');
}

//register admin
exports.registerAdmin = async function (req, res) {
    try {
        if (NODE_ENV === 'development') {
            const {name, phone, email, password} = req.body;
            // check if the user with provided email already exists
            const userExists = await Admindb.findOne({email});
            if (userExists) {
                return res.status(400).send('Admin already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
            const newAdmin = new Admindb({
                name,
                phone,
                email,
                password: hashedPassword
            });
            await newAdmin.save();
            res.status(201).send('Admin registered successfully');
        }
    } catch (err) {
        res.status(500).send('Error registering admin: ' + err.message);
    }
};

//login user to home page
exports.adminLogin = async function (req, res) {
    try {
        const userData = await adminLoginAuthenticate(req.body);
        if (userData) {
            delete userData.password;
            setSession(req, res, userData)
        } else {
            let err = "User not found!"
            res.render('admin-login', {errorMsg: err});
        }
    } catch (err) {
        res.render('admin-login', {errorMsg: err});
    }
};
//admin login validation
const adminLoginAuthenticate = (body) => {
    return new Promise((resolve, reject) => {
        if (!body) {
            reject("Please input credentials");
        } else {
            console.log(body);
            Admindb.findOne({email: body.email})
                .then(user => {
                    console.log(user);
                    if (user !== null) {
                        bcrypt.compare(body.password, user.password)
                            .then((status) => {
                                if (status)
                                    resolve(user);
                                else
                                    reject("Password is incorrect!");
                            })
                    } else {
                        reject("No user found!");
                    }
                })
        }
    });
};
//admin logout
exports.adminLogout = function (req, res) {
    req.session.destroy();
    res.redirect('/admin');
}