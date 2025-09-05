import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDec] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/addproduct",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDec("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-6 bg-white p-6 rounded-2xl shadow-2xl max-w-3xl mx-auto"
    >
      {/* Upload Section */}
      <div>
        <p className="text-lg font-semibold mb-3 text-gray-700">Upload Images</p>
        <div className="flex gap-4">
          {[setImage1, setImage2, setImage3, setImage4].map((setImage, idx) => (
            <label
              key={idx}
              htmlFor={`image${idx + 1}`}
              className="cursor-pointer"
            >
              <img
                src={
                  ![image1, image2, image3, image4][idx]
                    ? assets.upload_area
                    : URL.createObjectURL([image1, image2, image3, image4][idx])
                }
                className="w-24 h-24 object-cover rounded-xl border-2 border-dashed border-gray-300 hover:border-pink-400 transition shadow-md hover:shadow-lg"
                alt=""
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id={`image${idx + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name</p>
        <input
          className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none shadow-sm"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Type Here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none shadow-sm"
          onChange={(e) => setDec(e.target.value)}
          value={desc}
          placeholder="Write Here"
          required
        />
      </div>

      {/* Category + Sub + Price */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div>
          <p className="mb-2 font-medium">Product Category</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 shadow-sm"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Sub Category</p>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 shadow-sm"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">WinterWear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Price</p>
          <input
            className="w-full sm:w-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none shadow-sm"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-2 rounded-lg cursor-pointer border ${
                sizes.includes(size)
                  ? "bg-pink-100 border-pink-400 shadow-md"
                  : "bg-gray-100 border-gray-300"
              } transition hover:shadow-lg`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-3 mt-2 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="h-4 w-4 accent-pink-500"
        />
        <label className="cursor-pointer font-medium" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl shadow-xl hover:opacity-90 transition mt-4"
      >
        ➕ Add Product
      </button>
    </form>
  );
};

export default Add;
