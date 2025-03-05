import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSettings } from "@/providers/settings-provider"
import { ANIMATIONS } from "@/tabs/welcome"
import { ChevronLeftIcon, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import React, { useState } from "react"

import useActiveTab from "@/hooks/use-active-tab"
import type { Props } from "."
import { Input } from "../ui/input"
import { NAMES } from "@/constants/common"

const CreateNewBookmarkFolder = ({
  scrollToTab,
  animation,
  setAnimation,
}: Props) => {
  const [bookmarkFolderName, setBookmarkFolderName] = useState(NAMES.DEFAULT_BOOKMARK_FOLDER_NAME)
  const { setSettings } = useSettings()
  const activeTabId = useActiveTab()

  const onCreate = async () => {
    const bookmark = await chrome.bookmarks.create({
      title: bookmarkFolderName
    })

    console.log(bookmark)

    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        rootFolder: bookmark.id,
      },
    }))
    chrome.tabs.create({})
    chrome.tabs.remove(activeTabId)
  }

  return (
    <motion.div {...ANIMATIONS[animation]}>
      <Card className="w-full max-w-lg bg-background text-center min-w-[512px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Bookmark Folder</CardTitle>
          <p className="text-sm text-muted-foreground">
            After creating a folder, you can add bookmarks to {bookmarkFolderName} folder and it will automatically appear in the vivid-tab page
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Input
              value={bookmarkFolderName}
              onChange={(e) => setBookmarkFolderName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between pt-6">
          <Button
            onClick={() => {
              scrollToTab("IMPORT")
              setAnimation("leftToRight")
            }}
            variant="ghost"
            size="sm"
          >
            <ChevronLeftIcon className="mr-1 h-4 w-4" />
            BACK
          </Button>
          <Button
            disabled={!bookmarkFolderName}
            onClick={onCreate}
            variant="ghost"
            size="sm"
          >
            FINISH
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default CreateNewBookmarkFolder
