import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../../API/Axios';
import BookCard from './BookCard';
import { useCart } from '../Context/Cartcontext';
import { useWishList } from '../Context/WishListContext';

function Books() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("title") || "";

    const { addToCart, setDirectBuy } = useCart();
    const { isInWishList, toggleWishList } = useWishList();

    const [books, setBooks] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const itemsperpage = 10;

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.append("title", search);
        if (category) params.append("category", category);

        const query = `/api/books?${params.toString()}`;
        const token = localStorage.getItem("token");

        api.get(query, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBooks(res.data);
                setCurrentpage(1);
            })
            .catch(err => console.error(err));
    }, [search, category]);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = books.slice(firstindex, lastindex);
    const totalpages = Math.ceil(books.length / itemsperpage);

    const handleAddToCart = (book) => {
        addToCart(book);
    };

    const handleBuyNow = (book) => {
        setDirectBuy(book);
        navigate("/checkout");
    };

    const handleToggleFavorite = (book) => {
        toggleWishList(book);
    };

    return (
        <div className='py-14 sm:py-16 bg-white dark:bg-[#0b0c10] transition-colors duration-300 min-h-screen'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='text-center mb-12 max-w-2xl mx-auto'>
                    <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-serif font-extrabold text-gradient mb-4'>
                        {category ? `${category} Books` : 'Explore All Books'}
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className='text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>
                        Discover books that inspire, educate, and transport you to new worlds. Readora is your modern home for stories, knowledge, and imagination.
                    </p>
                </div>

                {/* Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {currentitems.map((book) => {
                        const bookId = book._id || book.id;
                        return (
                            <div key={bookId} className="h-full">
                                <BookCard
                                    book={book}
                                    isFavorite={isInWishList(bookId)}
                                    onAddToCart={() => handleAddToCart(book)}
                                    onBuyNow={() => handleBuyNow(book)}
                                    onToggleFavorite={() => handleToggleFavorite(book)}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalpages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {[...Array(totalpages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentpage(index + 1)}
                                className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    currentpage === index + 1
                                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;
