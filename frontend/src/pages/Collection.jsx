import React, { useContext, useEffect, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { assets } from '../assets/assets'
import Productitem from '../components/Productitem'

const Collection = () => {
  const { products, search, showsearch } = useContext(Shopcontext);
  const [showfilter, setShowFilter] = useState(true);
  const [filterproducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const applyfilter = () => {
    let productcopy = products.slice();

    if (showsearch && search) {
      productcopy = productcopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productcopy = productcopy.filter(item => category.includes(item.category));
    }

    if (subcategory.length > 0) {
      productcopy = productcopy.filter(item => subcategory.includes(item.subCategory));
    }

    setFilterProducts(productcopy);
  };

  const sortProduct = () => {
    let productCopy = filterproducts.slice();

    switch (sortType) {
      case 'lowtohigh':
        productCopy.sort((a, b) => a.price - b.price);
        break;
      case 'hightolow':
        productCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyfilter();
        return;
    }

    setFilterProducts(productCopy);
  };

  useEffect(() => {
    applyfilter();
  }, [category, subcategory, search, showsearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className=' min-h-screen rounded mb-10  pl-10 pr-20  '>
      <div className='mx-auto w-full max-w-8xl flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  '>

        {/* Sidebar Filters */}
        <div className='w-full  sm:w-[280px] bg-gray p-4 rounded-md shadow-md '>
          <div className='flex items-center justify-between sm:block'>
            <p className='text-2xl font-bold'>FILTERS</p>
            <img
              src={assets.dropdown_icon}
              className={`h-4 sm:hidden transform duration-200 ${showfilter ? 'rotate-90' : ''}`}
              onClick={() => setShowFilter(!showfilter)}
              alt="Toggle Filter"
            />
          </div>

          <div className={`mt-6 space-y-6 ${showfilter ? '' : 'hidden'} sm:block`}>
            {/* Category Filter */}
            <div className='bg-gray-100 pl-5 py-3 rounded-md'>
              <p className='mb-3 text-2xl font-medium text-gray-800'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {['Men', 'Women', 'Kids'].map(cat => (
                  <label key={cat} className='flex items-center gap-2 hover:bg-gray-200 p-1 rounded cursor-pointer'>
                    <input className="w-3" type='checkbox' value={cat} onChange={toggleCategory} />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-category Filter */}
            <div className='bg-gray-100 pl-5 py-3 rounded-md'>
              <p className='mb-3 text-2xl font-medium text-gray-800'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
                  <label key={sub} className='flex items-center gap-2 hover:bg-gray-200 p-1 rounded cursor-pointer'>
                    <input className="w-3 " type='checkbox' value={sub} onChange={toggleSubCategory} />
                    {sub}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className='flex-1 bg-white/10 p-4 rounded-md shadow-sm'>
          <div className='flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 gap-2'>
            <p className='text-xl md:text-3xl sm:text-2xl font-bold'>All Collections</p>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className='border border-gray-400 text-sm px-3 py-1 rounded-md focus:outline-none'
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="lowtohigh">Sort by: Low to High</option>
              <option value="hightolow">Sort by: High to Low</option>
            </select>
          </div>

          {/* Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-1'>
            {
              filterproducts.length > 0 ? (
                filterproducts.map((item, index) => (
                  <Productitem
                    key={index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                  />
                ))
              ) : (
                <div className='col-span-full text-center text-gray-500 py-10'>
                  No products match your filters.
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection;
