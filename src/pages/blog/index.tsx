import React from "react";
import { observer } from "mobx-react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { GetStaticPropsResult } from "next";

import PrismicService from "services/prismic-service";
import { useStores } from "utils/stores";
import ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";

// Components
const Container = dynamic(() => import("components/container"));
const Post = dynamic(() => import("components/post"));

const Blog = observer(({ posts }: Props) => {
  const stores = useStores();

  return (
    <Container>
      <Head>
        <title>Blog — {stores.uiStore.app_name}</title>
        <meta
          name="keywords"
          content="sofus,skovgaard,blog,react,csharp,dotnet,javascript,js,typescript,ts"
        />
        <meta
          name="description"
          content="This is my blog where i write about different topics, mostly software development and design related."
        />
      </Head>

      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold">Blog</h1>
          <span className="flex-1 my-auto inline-block w-100 border-b border-gray-200 ml-4"></span>
        </div>
      </div>

      {posts.results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.results.map((post, i) => (
            <Post key={post.id} doc={post} isMain={i == 0} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <span className="text-center text-sm text-gray-400">
            No posts to show
          </span>
        </div>
      )}
    </Container>
  );
});

type Props = {
  posts: ApiSearchResponse;
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const posts = (await PrismicService.getBlogPosts(1, 10)) as ApiSearchResponse;
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default Blog;
