import { Link } from "react-router-dom";
import { useWishList } from "../components/Context/WishListContext";

function WishList() {
    const { wishList, removeFromWishList } = useWishList();
    console.log(wishList);


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-12 px-4 transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-8">Your Wishlist</h1>
                {wishList.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-[#12131c] rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="text-5xl mb-4">💝</div>
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Save books you love to revisit later.</p>
                        <Link to="/books" className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:scale-[1.02] transition-all duration-200 shadow-md">
                            Explore Books
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {wishList.map(item => (
                            <div
                                key={item._id || item.id}
                                className="flex items-center gap-4 bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <Link to={`/bookdetailes/${item._id}`}>
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-16 h-22 sm:w-20 sm:h-28 object-cover rounded-xl flex-shrink-0 shadow-sm hover:scale-105 transition-transform duration-200"
                                    />
                                </Link>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{item.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">{item.author}</p>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">₹{item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeFromWishList(item._id || item.id)}
                                    className="flex-shrink-0 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors duration-200 touch-target"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishList