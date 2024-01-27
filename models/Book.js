const mongoose = require("mongoose")

const Book = mongoose.model("Book", {
    title: String,
    category: String,
    ISBN: String,
    photoName: String,
    userId: Number
})

module.exports = Book