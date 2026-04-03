import Prismic from "@prismicio/client";
import type { Document } from "@prismicio/client/types/documents";
import type ApiSearchResponse from "@prismicio/client/types/ApiSearchResponse";
import type { QueryOptions } from "@prismicio/client/types/ResolvedApi";

class PrismicService {
  //#region Blog posts

  async getLatestBlogPosts(id: string, pageSize: number = 3): Promise<Document[]> {
    const response = await this._getManyOfType(
      Prismic.Predicates.at("document.type", "blog_post"),
      undefined,
      1,
      pageSize + 1
    );
    return response.results.filter((post) => post.id !== id).slice(0, pageSize);
  }

  async getBlogPosts(
    page: number = 1,
    pageSize: number = 20
  ): Promise<Document[] | ApiSearchResponse> {
    if (page == null && pageSize == null) {
      const response = await this._getAllOfType(
        Prismic.Predicates.at("document.type", "blog_post")
      );
      return response;
    }
    const response = await this._getManyOfType(
      Prismic.Predicates.at("document.type", "blog_post"),
      undefined,
      page,
      pageSize
    );
    return response;
  }

  async getBlogPost(uid: string): Promise<Document> {
    const response = await this._getOneOfType([
      Prismic.Predicates.at("document.type", "blog_post"),
      Prismic.Predicates.at("my.blog_post.uid", uid),
    ]);
    return response;
  }

  async getNextBlogPost(id: string): Promise<Document> {
    const response = await this._getManyOfType(
      [Prismic.Predicates.at("document.type", "blog_post")],
      {
        orderings: "[document.first_publication_date]",
        after: id,
      },
      1,
      1
    );
    return response.results[0] ?? null;
  }

  async getPreviousBlogPost(id: string): Promise<Document> {
    const response = await this._getManyOfType(
      [Prismic.Predicates.at("document.type", "blog_post")],
      {
        after: id,
      },
      1,
      1
    );
    return response.results[0] ?? null;
  }

  //#endregion

  //#region Work experience

  async getWorkExperience(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(
      Prismic.Predicates.at("document.type", "work_experience"),
      undefined,
      1,
      100
    );
    return response;
  }

  //#endregion

  //#region Education

  async getEducation(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(
      Prismic.Predicates.at("document.type", "education"),
      undefined,
      1,
      100
    );
    return response;
  }

  //#endregion

  //#region Introduction

  async getIntroduction(): Promise<Document> {
    const response = await this._getOneOfType(
      Prismic.Predicates.at("document.type", "introduction")
    );
    return response;
  }

  //#endregion

  //#region Categories

  async getCategories(): Promise<ApiSearchResponse> {
    const response = await this._getManyOfType(
      Prismic.Predicates.at("document.type", "category"),
      undefined,
      1,
      100
    );
    return response;
  }

  //#endregion

  private _createAPIClient() {
    return Prismic.client(process.env.PRISMIC_URL + "/api/v2");
  }

  private async _getOneOfType(query: string | string[], options?: QueryOptions) {
    const client = this._createAPIClient();
    const response = await client.queryFirst(query, options);
    return response;
  }

  private async _getManyOfType(
    query: string | string[],
    options?: QueryOptions,
    page?: number,
    pageSize?: number
  ) {
    const client = this._createAPIClient();
    const response = await client.query(query, {
      orderings: "[document.first_publication_date desc]",
      page: page ?? 1,
      pageSize: pageSize ?? 10,
      ...options,
    });
    return response;
  }

  private async _getAllOfType(query: string | string[]) {
    const results: Document[] = [];

    let response = await this._getManyOfType(query, undefined, 1, 100);
    response.results.forEach((result) => results.push(result));

    while (response.total_pages > response.page) {
      response = await this._getManyOfType(query, undefined, response.page + 1, 100);
      response.results.forEach((result) => results.push(result));
    }

    return results;
  }
}

const prismicService = new PrismicService();
export default prismicService;
