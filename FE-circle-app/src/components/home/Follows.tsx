import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"

const Follows = () => {
  return (
    <>
      <Box className="border-x border-slate-400 mt-4 p-4">
        <Text>Follows</Text>

        <Tabs isLazy mt={8}>
          <TabList>
            <Tab w={"50%"}>Followers</Tab>
            <Tab w={"50%"}>Following</Tab>
          </TabList>

          <TabPanels>
            {/* initially mounted */}
            <TabPanel>
              <p>one!</p>
            </TabPanel>

            {/* initially not mounted */}
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default Follows
