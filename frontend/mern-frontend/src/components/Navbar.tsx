import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaRegSquarePlus } from "react-icons/fa6"
import { useColorMode } from "./ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode(); // this is a hook from chakraUI

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={'space-between'}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaRegSquarePlus fontSize={20}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun />}</Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar