import { Product, useProductStore } from "@/store/product";
import { Button, CloseButton, Dialog, Input, Portal, VStack } from "@chakra-ui/react"
import { ReactNode, useState } from "react";
import { Toaster, toaster } from "./ui/toaster";

interface Props {
    children?: ReactNode,
    product: Product
}

export const Modal = ({ children, product } : Props) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const {updateProduct} = useProductStore();
    const handleUpdateProduct = async () => {
        const {success, message} = await updateProduct(updatedProduct, product._id);
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
    }

    return (
    <Dialog.Root>
        <Toaster />
        <Dialog.Trigger asChild>
        {children}
        </Dialog.Trigger>
        <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
            <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Update Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <VStack gap={4}>
                <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name} // link to new product above
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value}) } // populates with the updatedProduct fields when using ...
                />
                <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price} // link to new product above
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: +e.target.value}) }
                />
                <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image} // link to new product above
                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value}) }
                />
                </VStack>
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                <Button
                    colorPalette="blue"
                    onClick={handleUpdateProduct}
                    >Update</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            </Dialog.Content>
        </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
    )
}
