const { nanoid } = require("nanoid");
const books = require("./books");

cors = {
    origin: ['*'],
};
//menyimpan buku
function saveBookshelf(req, h) {
    const { name, year, author, publisher } = req.payload;

    const id = nanoid(17);
    const finished = pageCount === readPage;
    const insertAt = new Date().toISOString();
    const updatedAt = insertAt;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertAt, updatedAt,
    };

    books.push(newBook);

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    };

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const berhasil = books.filter((book) => book.id === id).length > 0;

    if (berhasil) { 
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan ',
            data: {
                bookId: id,
            }
        });
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500);
        return response;
    }

}
// membuka semua buku        
function getAllBookshelf(req, h) {
    const {name, reading,finished} = req.query;
    let bquery = books;
    if (name == name) {
        bquery = books.filter((book)=> book.name.toLowerCase().includes(name.toLowerCase()),);
    } else if (reading == 1 || 0) {
        if (1) {
            bquery = books.filter((book) => book.reading === true);
            return bquery;
        } else if (0) {
            bquery = books.filter((book) => book.reading === false);
            return bquery;
        } else {
            bquery = books.filter((book) => book.reading === true || false);
            return bquery;
        }
    } else if (finished == 1 || 0) {
        if (1) {
            bquery = books.filter((book) => book.finished === true);
            return bquery;
        } else if (0) {
            bquery = books.filter((book) => book.finished === false);
            return bquery;
        } else {
            bquery = books.filter((book) => book.finished === true || false);
            return bquery;
        }
    }

    return ({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        }
    });
}

// mendapatkan detail buku

function getBookshelfById(req, h) {
    const { id } = req.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };

    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;
    };
}

function editBookshelf(req, h) {
    const { id } = req.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
    } = req.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage >= pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    };

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: ' Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    };
}

function deleteBookshelf(req, h) {
    const { id } = req.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan telah dihapus',
        });
        response.code(200);
        return response;
    } else {

        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
}




module.exports = {saveBookshelf, getAllBookshelf, getBookshelfById, editBookshelf, deleteBookshelf};