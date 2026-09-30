


// import { useOrder } from '../Context/OrderContext';

// function OrderList() {
//     const { orders } = useOrder();


//     if (!orders || orders.length === 0) {
//         return <p>No orders found</p>;
//     }

//     return (
//         <div className="">
//             {orders.map((order, orderIndex) => (
//                 <div
//                     key={`order-${orderIndex}`}
//                     className="border p-4 rounded shadow"
//                 >
//                     <div>

//                         <h2 className="font-bold text-lg mb-2">
//                             Order #{orderIndex + 1}
//                         </h2>

//                         <p>Status: {order.status}</p>
//                         <p>Payment: {order.paymentMethod}</p>
//                         <p>Total: ₹{order.totalAmount}</p>
//                         <p>{order.items?.price}</p>

//                         <h3 className="font-semibold mt-3">Items</h3>
//                     </div>

//                     {order.items.map((item, itemIndex) => (
//                         <div
//                             key={`${item.id}-${itemIndex}`}
//                             className="ml-4 "
//                         >

//                             <div>
//                                 <p>Title :{item.title}</p>
//                                 <p>
//                                     Price: ₹{item.price}
//                                 </p>
//                                 <p>Quantity :{item.qty}</p>
//                                 <p>Totel Amount:{order.totalAmount}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default OrderList;
import { useOrder } from '../Context/OrderContext';

function OrderList() {

    const { orders } = useOrder();

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] flex justify-center items-center px-4 transition-colors duration-300">
                <div className="text-center bg-white dark:bg-[#12131c] border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm max-w-md w-full">
                    <p className="text-4xl mb-3">📦</p>
                    <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">No Orders Yet</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                        When you place an order, it will show up here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] py-10 sm:py-14 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
                    My Orders
                </h1>

                {orders.map((order, orderIndex) => (
                    <div
                        key={`order-${orderIndex}`}
                        className="bg-white dark:bg-[#12131c] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        {/* HEADER */}
                        <div className="bg-slate-50/70 dark:bg-slate-800/40 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                                    Order #{orderIndex + 1}
                                </h2>

                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Payment: <span className="font-semibold text-slate-700 dark:text-slate-300">{order.paymentMethod}</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-4 justify-between sm:justify-end">
                                <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 capitalize">
                                    {order.status}
                                </span>

                                <div className="text-right">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total</p>
                                    <h3 className="text-xl font-serif font-bold text-indigo-600 dark:text-indigo-400">
                                        ₹{order.totalAmount}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* ITEMS */}
                        <div className="p-6 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                            {order.items.map((item, itemIndex) => (
                                <div
                                    key={`${item._id}-${itemIndex}`}
                                    className="pt-4 first:pt-0"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        {/* LEFT */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm"
                                            />

                                            <div>
                                                <h3 className="text-base sm:text-lg font-serif font-semibold text-slate-900 dark:text-slate-100">
                                                    {item.title}
                                                </h3>

                                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                                                    Quantity: {item.qty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="text-right sm:text-right">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Price</p>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                                                ₹{item.price}
                                            </h3>

                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                Subtotal: ₹{item.price * item.qty}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderList;