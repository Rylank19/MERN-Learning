import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useColorModeValue } from './ui/color-mode';
import { Product, useProductStore } from '@/store/product';
import { Toaster, toaster } from '@/components/ui/toaster';
import { Modal } from './Modal';

const ProductCard = ({product} : {product : Product}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct}=useProductStore();

    const handleDeleteProduct = async (pid : string) => {
        const {success, message} = await deleteProduct(pid);
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
            title: `Product Deleted Successfully`,
            type: "success",
            action: {
            label: "Close",
            onClick: () => console.log("Closed"),
            }
        })
        }
    }

    return (
    <Box
    shadow={"lg"}
    rounded={'lg'}
    overflow={'hidden'}
    transition={'all 0.3s'}
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}
    >
        <Toaster />
        <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

        <Box p={4}>
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack>
                <Modal product={product}>
                    <IconButton colorPalette={'blue'}>
                        <FaRegEdit />
                    </IconButton>
                </Modal>
                <IconButton colorPalette={'red'} onClick={() => handleDeleteProduct(product._id)}>
                    <RiDeleteBin6Fill />
                </IconButton>
            </HStack>
        </Box>
    </Box>
    );
}

export default ProductCard