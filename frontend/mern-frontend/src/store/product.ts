import {create} from "zustand"

// this file essentially connects to our backend methods to manipulate data on the server

export interface Product {
    name: string;
    image: string;
    price: number;
    _id: string;
}

interface Response {
    success: boolean;
    message: string;
}

interface MyState {
    products : Product[],
    setProducts: (products: []) => void,
    createProduct: (newProduct: {name: string; image: string; price: string;}) => Promise<Response>,
    fetchProducts: () => Promise<void>,
    deleteProduct: (pid: string) => Promise<Response>,
    updateProduct: (updatedProduct : Product, pid: string) => Promise<Response>
}

export const useProductStore = create<MyState>((set) => ({
    products: [],
    setProducts: (products: []) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]})); // updates products with the new product + all the old ones
        return {success: true, message: "Product created successfully"};
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products"); // must automatically send GET request?
        const data = await res.json();
        set({ products: data.data});
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message};

        // this line updates the ui immediately. If not here then a refresh is needed to see changes
        set((state) => ({products: state.products.filter(product => product._id !== pid)}));
        return { success: true, message: data.message};
    },
    updateProduct: async (updatedProduct, pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedProduct)
        });
        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set((state) => ({products:state.products.map(product => product._id === pid ? data.data : product)}));
        return {success: true, message: "Product updated successfully"};
    }
})) // this is a callback ( the brackets mean we are returning an object)