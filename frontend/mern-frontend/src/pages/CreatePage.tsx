import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Toaster, toaster } from '@/components/ui/toaster';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct} = useProductStore();
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title:`Error: ${message}`,
        type: "error",
        action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        }
      });
    }
    else {
      toaster.create({
        title: `Message: ${message}`,
        type: "success",
        action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        }
      })
    }
    setNewProduct({name: "", price: "", image: ""});
  }

  return (
    <Container maxW={"container.sm"}>
      <Toaster />
      <VStack
        gap={8}
      >
        <Heading as={"h1"} size={"5xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack gap={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name} // link to new product above
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value}) } // populates with the newProduct fields when using ...
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price} // link to new product above
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value}) }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image} // link to new product above
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value}) }
            />
            <Button
              colorPalette="blue"
              onClick={handleAddProduct}
              w="full"
            >
              Add Product
            </Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage