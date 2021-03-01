import React, { useState, ChangeEvent, memo } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import DragItem from './DragItem'
import { menuItems, MenuItem } from '~componentsList'

const Menu: React.FC<UIBuilderSidebarComponentProps> = ({ componentTree }) => {
  const [searchTerm, setSearchTerm] = useState('')
  console.log('==componentTree=', componentTree)
  const components = componentTree
  return (
    <DarkMode>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 14rem"
        p={5}
        m={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
      >
        <InputGroup size="sm" mb={4}>
          <Input
            value={searchTerm}
            color="gray.300"
            placeholder="Search component…"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            borderColor="rgba(255, 255, 255, 0.04)"
            bg="rgba(255, 255, 255, 0.06)"
            _hover={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
            zIndex={0}
          />
          <InputRightElement zIndex={1}>
            {searchTerm ? (
              <IconButton
                color="gray.300"
                aria-label="clear"
                icon={<CloseIcon path="" />}
                size="xs"
                onClick={() => setSearchTerm('')}
              />
            ) : (
              <SearchIcon path="" color="gray.300" />
            )}
          </InputRightElement>
        </InputGroup>
        <Accordion allowMultiple defaultIndex={[0, 1]} color="#fff">
          {(components as UIBuilderComponentsGroupProps[])
            // .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((componentGroup, groupIndex) => {
              const { label, expanded, children: items } = componentGroup

              return (
                <AccordionItem key={'sidebar-group-' + groupIndex.toString()}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {label}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {(items as UIBuilderComponentsItemProps[])
                      // .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((componentItem, itemIndex) => {
                        const { type, label, props } = componentItem
                        // console.log("===xx===", component.type);
                        return (
                          <DragItem
                            key={`sidebar-item-${groupIndex.toString()}-${itemIndex.toString()}`}
                            label={label}
                            type={type}
                            defaultProps={props}
                          >
                            {label}
                          </DragItem>
                        )
                      })}
                  </AccordionPanel>
                </AccordionItem>
              )

              // const { children, soon } = menuItems[name] as MenuItem

              // if (children) {
              //   const elements = Object.keys(children).map(childName => (
              //     <DragItem
              //       isChild
              //       key={childName}
              //       label={childName}
              //       type={childName as any}
              //       id={childName as any}
              //       rootParentType={menuItems[name]?.rootParentType || name}
              //       defaultProps={menuItems[name]?.defaultProps}
              //     >
              //       {childName}
              //     </DragItem>
              //   ))

              //   return [
              //     <DragItem
              //       isMeta
              //       soon={soon}
              //       key={`${name}Meta`}
              //       label={name}
              //       type={`${name}Meta` as any}
              //       id={`${name}Meta` as any}
              //       rootParentType={menuItems[name]?.rootParentType || name}
              //       defaultProps={menuItems[name]?.defaultProps}
              //     >
              //       {name}
              //     </DragItem>,
              //     ...elements,
              //   ]
              // }

              // return (
              //   <DragItem
              //     soon={soon}
              //     key={name}
              //     label={name}
              //     type={name as any}
              //     id={name as any}
              //     rootParentType={menuItems[name]?.rootParentType || name}
              //     defaultProps={menuItems[name]?.defaultProps}
              //     >
              //     {name}
              //   </DragItem>
              // )
            })}
        </Accordion>
        {/* <Accordion allowMultiple defaultIndex={[0,1]} color="#fff">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  字段
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  相关表
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  组件
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {(Object.keys(menuItems) as ComponentType[])
                .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(name => {
                  const { children, soon } = menuItems[name] as MenuItem

                  if (children) {
                    const elements = Object.keys(children).map(childName => (
                      <DragItem
                        isChild
                        key={childName}
                        label={childName}
                        type={childName as any}
                        id={childName as any}
                        rootParentType={menuItems[name]?.rootParentType || name}
                        defaultProps={menuItems[name]?.defaultProps}
                      >
                        {childName}
                      </DragItem>
                    ))

                    return [
                      <DragItem
                        isMeta
                        soon={soon}
                        key={`${name}Meta`}
                        label={name}
                        type={`${name}Meta` as any}
                        id={`${name}Meta` as any}
                        rootParentType={menuItems[name]?.rootParentType || name}
                        defaultProps={menuItems[name]?.defaultProps}
                      >
                        {name}
                      </DragItem>,
                      ...elements,
                    ]
                  }

                  return (
                    <DragItem
                      soon={soon}
                      key={name}
                      label={name}
                      type={name as any}
                      id={name as any}
                      rootParentType={menuItems[name]?.rootParentType || name}
                      defaultProps={menuItems[name]?.defaultProps}
                      >
                      {name}
                    </DragItem>
                  )
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion> */}
      </Box>
    </DarkMode>
  )
}

export default memo(Menu)
