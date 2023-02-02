import { appName, appUrl } from "@/src/utils";
import Head from "next/head";
import React from "react";

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const OgMeta: React.FC<IProps> = ({
  title = appName,
  description = "A simple storypoint app for agile teams",
  image = "/img/og/PokerOgBase.png",
  url = appUrl,
}) => {
  let imgUrl = image;
  if (imgUrl.startsWith("/")) imgUrl = appUrl + image;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgUrl} />
    </Head>
  );
};

export default OgMeta;
