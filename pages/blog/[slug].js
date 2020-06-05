import Layout from "../../components/layout";
import Head from "next/head";
import React from "react";
import axiosInstance from "../../config/axios";

export default function SingleBlog({blog}) {
    const createMarkup = () => ({__html: blog.content});
    return <Layout page="SingleBlog" headerContent={null} headerClass="page-header no-bg" redBar>
        <Head>
            <title>{blog.title}</title>
        </Head>

        <section className="single-post">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="white-bg">
                            <img src={blog.image} alt="" className="img-fluid blog-image"/>

                            <div className="row">
                                <div className="col-md-9 mx-auto">
                                    <div className="content">
                                        <h1>{blog.title}</h1>

                                        <div className="category">
                                            <p>{blog.category.name}</p>
                                            <p>{blog.estimated_reading_time} min. read</p>
                                            <p>{blog.date_formatted_alt}</p>
                                        </div>

                                        <div dangerouslySetInnerHTML={createMarkup()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export async function getStaticPaths() {
    const {data: response} = await axiosInstance.get('blogs-slugs');
    const slugs = response.map(slug => ({
        params: {
            slug: slug.slug
        }
    }));
    return {
        paths: slugs,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug;

    const {data: {data: blog}} = await axiosInstance.get(`blogs/${slug}`);

    return {
        props: {
            blog
        }
    }
}