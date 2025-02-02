import { Metadata } from "next"

import { Hydrate, dehydrate } from "@tanstack/react-query"

import { HomeFeed } from "~/components/home/HomeFeed"
import { APP_NAME, APP_SLOGAN } from "~/lib/env"
import getQueryClient from "~/lib/query-client"
import { prefetchGetFeed } from "~/queries/home.server"

export const metadata: Metadata = {
  title: `${APP_NAME} - ${APP_SLOGAN}`,
}

export default async function HomeActivities() {
  const queryClient = getQueryClient()
  await prefetchGetFeed(
    {
      type: "featured",
    },
    queryClient,
  )

  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <HomeFeed type="featured" />
    </Hydrate>
  )
}
