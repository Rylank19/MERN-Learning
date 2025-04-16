import { Container, Flex, HStack, Text, Button, Icon } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaRegSquarePlus } from "react-icons/fa6"
import { useColorMode } from "./ui/color-mode"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { FaCartShopping } from "react-icons/fa6"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="1140px" px={4}>
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
          fontSize={{ base: "22", sm: "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store🛒</Link>
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