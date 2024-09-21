import Link from 'next/link'
import { useEffect } from 'react'
import { useBookmarkContext } from './BookmarkContext';

import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab
} from '@nextui-org/react'
import { BookmarkSpace } from './types'

export default function BookmarkCard () {
  const { spaces, gitRead, currentSpace, setCurrentSpace } = useBookmarkContext();


  const handleGitReadClick = async () => { await gitRead('some/path') }

  const onTabsChange = (spaceName: string) => {
    if (spaces.length) {
      const spaceToSet = spaces.find((space) => space.name === spaceName)
      if (spaceToSet) setCurrentSpace(spaceToSet)
    }
  }

  // useEffect(() => {
  //   const fetchResult = async () => {
  //     console.log('Calling gitRead on mount');
  //     handleGitReadClick()
  //   };
  //   fetchResult();
  // }, [gitRead]);

  return (
    <Card>
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div className='flex items-center'>
            <h4 className='mr-6'>
              Bookmarks
            </h4>
            { currentSpace && <h6>{currentSpace.name}</h6>}
          </div>
          { (spaces && spaces.length) &&
            <div className='flex items-center'>
              <Tabs
                items={spaces}
                className="mr-4"
                onSelectionChange={onTabsChange}
              >
                {(space: BookmarkSpace) => (
                  <Tab
                    key={space.name}
                    title={space.name}
                    selectedKey={currentSpace ? currentSpace.name : undefined}
                    onClick={() => { setCurrentSpace(space.name) }}
                  />
                )}
              </Tabs>
              <Button onClick={handleGitReadClick}>Reload</Button>
            </div>
          }
        </div>
      </CardHeader>
      <CardBody>
        { currentSpace && <BookmarkSpaceComponent />}
        { !spaces || !spaces.length
          &&
          <Button onClick={handleGitReadClick}>
            Bookmarks not loaded. Try refresh
          </Button>
        }
      </CardBody>
    </Card>
  )
}

function BookmarkSpaceComponent () {
  const { currentSpace } = useBookmarkContext();

  return (
    <div>
      {currentSpace?.categories.map((category, index) => (
        <BookmarkCategoryComponent key={index} category={category} />
      ))}
    </div>
  )
}

function BookmarkCategoryComponent ({ category }) {
  return (
    <div className='my-4'>
      <hr className='mb-2' />
      <div>
        {category.name}
      </div>
      <div>
        {category?.links.map((link, index) => (
          <BoookmarkLinkComponent key={index} link={link} />
        ))}
      </div>
    </div>
  )
}

function BoookmarkLinkComponent ({ link }) {
  const { extractDomain } = useBookmarkContext()

  return (
    <Button asChild variant='link'>
      <Link href={link.url} target="_blank" className="flex items-center">
        <Avatar
          src={`https://icons.duckduckgo.com/ip3/${extractDomain(link.url)}.ico`}
          className="w-5 h-5 text-tiny mr-2"
          name={link.name.slice(0, 1)}
        />
        <span>
          {link.name}
        </span>
      </Link>
    </Button>
  )
}
