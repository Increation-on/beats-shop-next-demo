import React from 'react';
import { Cart, Footer, FooterBanner, HeroBanner, Layout, NavBar, Product } from '../components';
import { client } from '../lib/client';


const Home = ({ productsData, bannerData }) => {
    console.log(productsData)
    return (
        <>
            <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
            {console.log(bannerData)}
            <div className='products-heading'>
                <h2>Best Selling products</h2>
                <p>Speakers of many variations</p>
            </div>
            <div className='products-container'>
                {productsData?.map((el) => {
                    return <Product key={el._id} product={el} />
                })}
            </div>
            <FooterBanner footerBanner={bannerData && bannerData[0]} />
        </>
    )
}

export const getServerSideProps = async () => {
    const query = `*[_type == "product"]`;
    const productsData = await client.fetch(query)
    const bannerQuery = `*[_type == "banner"]`;
    const bannerData = await client.fetch(bannerQuery)

    return {
        props: {
            productsData,
            bannerData
        }
    }
}

export default Home;