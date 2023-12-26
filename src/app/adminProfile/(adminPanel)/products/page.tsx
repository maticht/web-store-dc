"use client"
import React, {useEffect, useState} from 'react';
import {AdminProducts} from "@/components/adminProducts";
import {ProductsSearch} from "@/components/ProductsSearch";
import {getAllProductsAdmin, getData} from "@/services/getData";
import axios from "axios";

const Page = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        getAllProductsAdmin().then((data)=>setProducts(data.data.products))
    }, [])

    useEffect(()=>{
        console.log(products)
    },[products])

    return (
        <div>
            <div className='store-container'>
                <div className='store-head-block'>
                    <div>
                        <h3>Каталог товаров</h3>
                        <p className='store-quantity'>Количество товаров {products.length}</p>
                    </div>
                    <ProductsSearch onSearch={setProducts}/>
                </div>
                <AdminProducts search={products}/>
            </div>
        </div>
    );
};

export default Page;