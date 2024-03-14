import { Button, DarkThemeToggle, Flowbite, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard.tsx';
import Loading from './components/Loading.tsx';
import FormProduct from './components/FormProduct.tsx';
import FooterComponent from './components/FooterComponent.tsx';

type Status = 'idle' | 'loading' | 'success' | 'error';
type Product = {
    readonly id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};
const App = () => {
    const [openModal, setOpenModal] = useState(false);
    const [status, setStatus] = useState<Status>('idle'); // [1]
    const [products, setProducts] = useState<Product[]>([]); // [2
    const [dataForm, setDataForm] = useState<Product>(); // [2

    useEffect(() => {
        setStatus('loading'); // [2]
        fetch('https://fakestoreapi.com/product')
            .then((response) => response.json())
            .then((data) => {
                setStatus('success'); // [3]
                setProducts(data);
            })
            .catch(() => {
                setStatus('error'); // [4]
            });
    }, []);

    function getDataForm(product) {
        setDataForm(product);
    }

    const createProduct = () => {
        fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify(dataForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts([...products, data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setOpenModal(false);
    };

    return (
        <Flowbite>
            <div className="container mt-5">
                <div className="flex items-center justify-between bg-gray-100 p-3 dark:bg-gray-800">
                    <DarkThemeToggle />
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        My Products
                    </h1>
                    <Button onClick={() => setOpenModal(true)}>Add New Product</Button>
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Add Product Form</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <FormProduct getDataForm={getDataForm} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" onClick={() => createProduct()}>
                                Add Product
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div>
                    {status === 'loading' ? (
                        //loop 8 times
                        <Loading />
                    ) : status === 'error' ? (
                        <div className="flex h-dvh items-center justify-center">
                            <h1 className="text-6xl font-bold capitalize text-red-500">
                                No Data to show
                            </h1>
                        </div>
                    ) : (
                        <div className="my-6 grid grid-cols-1 gap-5 md:grid-cols-2  lg:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    title={product.title}
                                    price={product.price}
                                    description={product.description}
                                    img={product.image}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <FooterComponent />
        </Flowbite>
    );
};
export default App;
