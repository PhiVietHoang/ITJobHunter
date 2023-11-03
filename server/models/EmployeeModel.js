const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
        match: /^\d{10}$/
    },
    dob: {
        type: Date,
    },
    joinDate: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
    },
    description:{
        type: String,
    },
    experience: {
        type: String, 
        enum: ["Fresher", "1 year", "2 years", "3 years", "4 years", "More than 4 years"], 
    },
    address:{
        city: {
            type: String,
            enum: ["An Giang",
            "Bà Rịa-Vũng Tàu",
            "Bạc Liêu",
            "Bắc Giang",
            "Bắc Kạn",
            "Bắc Ninh",
            "Bến Tre",
            "Bình Dương",
            "Bình Định",
            "Bình Phước",
            "Bình Thuận",
            "Cà Mau",
            "Cao Bằng",
            "Đắk Lắk",
            "Đắk Nông",
            "Điện Biên",
            "Đồng Nai",
            "Đồng Tháp",
            "Gia Lai",
            "Hà Giang",
            "Hà Nam",
            "Hà Tĩnh",
            "Hải Dương",
            "Hậu Giang",
            "Hòa Bình",
            "Hưng Yên",
            "Khánh Hòa",
            "Kiên Giang",
            "Kon Tum",
            "Lai Châu",
            "Lâm Đồng",
            "Lạng Sơn",
            "Lào Cai",
            "Long An",
            "Nam Định",
            "Nghệ An",
            "Ninh Bình",
            "Ninh Thuận",
            "Phú Thọ",
            "Phú Yên",
            "Quảng Bình",
            "Quảng Nam",
            "Quảng Ngãi",
            "Quảng Ninh",
            "Quảng Trị",
            "Sóc Trăng",
            "Sơn La",
            "Tây Ninh",
            "Thái Bình",
            "Thái Nguyên",
            "Thanh Hóa",
            "Thừa Thiên-Huế",
            "Tiền Giang",
            "Trà Vinh",
            "Tuyên Quang",
            "Vĩnh Long",
            "Vĩnh Phúc",
            "Yên Bái",
            "Cần Thơ",
            "Đà Nẵng",
            "Hải Phòng",
            "Hà Nội",
            "TP.Hồ Chí Minh"],
        },
        country: {
            type: String,
            default: "Việt Nam",
        },
    },
    gender:{
        type: String,
        enum: ["Male", "Female"],
    },
    education:[{
        nameSchool: String,
        degree: {
            type: String,
            enum: ["High school", "Intermediate", "College", "Bachelor", "Postgraduate"],
        },
        completeDate: Date,
    }],
    certificates: [{
        name: String,
        issuedBy: String,
        from: Date,
        to: Date,
    }],
    skill:{
        technical:[{
            type: String,
            enum: [
                'Javascript',
                'Python',
                'Go',
                'Java',
                'Kotlin',
                'PHP',
                'C#',
                'Swift',
                'R',
                'Ruby',
                'C and C++',
                'Matlab',
                'TypeScript',
                'Scala',
                'SQL',
                'HTML',
                'CSS',
                'NoSQL',
                'Rust',
                'Perl',
                'Other language',
                'tester',
                'manage project',
            ],
        }],
        soft:[{
            type: String,
            enum: [
                'English',
                'Japanese',
                'Chinese',
                'Franch',
                'Spanish',
                'Russian',
                'German',
                'Presentation',
                'Teamwork',
                'Writting',
                'Communication',
                'Other skills'
            ],
        }],
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;