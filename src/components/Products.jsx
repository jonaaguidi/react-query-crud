import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteProduct, getProducts } from "../api/productsAPI"

export const Products = () => {

    // Desestructuro los distintos estados posibles y la información
    // Llamo la funcion para traer la info de los productos en "queryFn"
    // Utilizo "select" para ordenar los productos
    const { isLoading, data: products, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        select: products => products.sort((a, b) => b.id - a.id)
    })

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
    })

    // Valido si mi componente esta cargando o si tiene algun error
    if (isLoading) {
        return <div>Cargando reina..</div>
    } else if (isError) {
        return <div>Error:{error.message}</div>
    }

    // Mapeo todos los productos.
    return products.map((product) => (
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => {
                deleteProductMutation.mutate(product.id)
            }}>
            Delete</button>
            <input
                type="checkbox"
                checked={product.inStock}
            />
            <label htmlFor>In Stock</label>
        </div>
    ));
};
