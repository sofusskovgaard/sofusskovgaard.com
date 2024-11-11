import React from "react";
import { RichText } from "prismic-reactjs";
import { Document } from "@prismicio/client/types/documents";

const Introduction = ({ model }: Props): JSX.Element => {
  return (
    <div className="flex flex-col sm:block lg:grid lg:grid-cols-2 gap-10 w-full">
      <img
        alt={model.data.portrait.alt}
        src={model.data.portrait.url}
        height={model.data.portrait.dimensions.height}
        width={model.data.portrait.dimensions.width}
        className="hidden lg:block rounded"
      />

      <div className="lg:flex flex-col gap-5">
        <img
          alt={model.data.portrait.alt}
          src={model.data.portrait.url}
          height={model.data.portrait.dimensions.height}
          width={model.data.portrait.dimensions.width}
          className="block lg:hidden rounded w-full sm:w-1/2 sm:float-left sm:mr-5 mb-5"
        />

        <div className="mb-5 lg:mb-0">
          <h1 className="font-bold text-3xl whitespace-nowrap">{model.data.title[0].text}</h1>
          <h3 className="font-mono font-medium uppercase whitespace-nowrap text-gray-500">
            {model.data.subtitle[0].text}
          </h3>
        </div>

        <div className="min-w-full prose text-justify">
          {RichText.render(model.data.introduction)}
        </div>
      </div>
    </div>
  );
};

export default Introduction;

export type Props = {
  model: Document;
};
