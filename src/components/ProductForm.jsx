import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";

const ProductForm = () => {

    // Llamo al Hook "useQueryClient" que lo que hace es interactuar con el contexto, es decir poder actualizar cambios sin actualizar la web.
    const queryClient = useQueryClient();

    // Llamo a useMutation para crear un nuevo producto, le pasamos la funcion para "Crear" "Actualizar" o "Eliminar" productos, además de "onSuccess" para ejecutar algo una vez que fue exitosa.
    const addProduct = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            alert("Se añadio un nuevo producto");
            queryClient.invalidateQueries();
        }
    })

    // En vez crear un State para cada Input, puedo obtener un objeto con los datos de los input, utilizando JS.
    // Utilizo mi funcion "addProduct" para "Mutar" y poder crear un objeto/producto con los datos del Form + una propiedad inStock.
    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const product = Object.fromEntries(formData)
        addProduct.mutate({
            ...product,
            inStock: true,
        });
    }

    return (
        <form style={{display:"flex", flexDirection:"column", gap:"1rem", width:"50%"}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" />
            <label htmlFor="description">Description</label>
            <input name="description" id="description" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default ProductForm