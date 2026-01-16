import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShoppingBag, Tag, Search, Filter, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/api/shop/products/'),
                api.get('/api/shop/categories/')
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            toast.error('Failed to load store inventory');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category_details?.name === activeCategory);

    return (
        <div className="pt-32 pb-16 px-4 container">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2">SPORTS SHOP</h1>
                    <p className="text-text-muted">Pro-grade gear for the professional athlete</p>
                </div>
                <div className="flex gap-2 bg-surface p-1 rounded-2xl border border-border overflow-x-auto max-w-full">
                    {['All', ...categories.map(c => c.name)].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'hover:bg-white/5 text-text-muted'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-2xl font-bold">Unboxing products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="glass-card rounded-3xl overflow-hidden group">
                            <div className="aspect-square bg-white/5 relative overflow-hidden">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/10">
                                        <ShoppingBag size={80} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">
                                    {product.category_details?.name || 'Gear'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                                <p className="text-2xl font-black text-primary mb-4">₹{product.price}</p>
                                <div className="flex gap-2">
                                    <button className="flex-grow bg-white text-black hover:bg-primary hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                        <ShoppingCart size={18} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
