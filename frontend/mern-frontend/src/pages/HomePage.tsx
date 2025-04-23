import { useProductStore } from '@/store/product';
import { Container, VStack, Text, SimpleGrid, Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])
  console.log("products", products)

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8}>
        <Text
            fontSize={30}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient="to-r"
            gradientFrom="cyan.400"
            gradientTo="blue.500"
            bgClip={"text"}
          >
            Current Products 🚀
          </Text>

          {products.length === 0 && (
            <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
              No products found 😢{" "}
              <Link to={"/create"}>
                <Text as={'span'} color={'blue.500'} _hover={{textDecoration: "underline"}}>
                  Create a product
                </Text>
              </Link>
            </Text>
          )}

          <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          gap={10}
          w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default HomePage