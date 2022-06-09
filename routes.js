const { saveBookshelf, getAllBookshelf, getBookshelfById, editBookshelf, deleteBookshelf } = require("./handler");

    cors = {
        origin: ['*'],
    };
const routes =
[
    //rute untuk menyimpan Bookshelf
    {
        method: 'POST',
        path: '/books',
        handler: saveBookshelf,

    },
    //rute untuk menampilkan seluruh Bookshelf
    {
        method: 'GET',
        path: '/books/{name?}/{reading?}/{finished?}',
        handler: getAllBookshelf,
    },
    //rute untuk menampilkan Bookshelf berdasar Id
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookshelfById,
    },
    //rute untuk mengubah Bookshelf
    {
        method: 'PUT',
        path: '/books/{booksId}',
        handler: editBookshelf,
    },
    //rute untuk menghapus Bookshelf
    {
        method: 'DELETE',
        path: '/books/{booksId}',
        handler: deleteBookshelf,
    }
];

module.exports = routes;